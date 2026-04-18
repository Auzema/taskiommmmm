import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateCurrentActiveBoard } from '~/redux/activeBoard/activeBoardSlice'
import { fetchUpdateBoardInfoAPI } from '~/apis/board.api'
import { useEffect, useState } from 'react'
import {
  backgroundBoardList,
  imagesBackground
} from '~/constant/backgroundBoard'

export function useBoardInfo() {
  const dispatch = useDispatch()
  const board = useSelector((state) => state.activeBoard.board)
  const [selectedBackground, setSelectedBackground] = useState(null)

  const type = {
    PUBLIC: 'public',
    PRIVATE: 'private',
    WORKSPACE: 'workspace'
  }

  const descriptionType = {
    PUBLIC:
      'Anyone on the internet can see this board. Only board members can edit',
    PRIVATE:
      'Board members and Trello Workspace Workspace admins can see and edit this board.',
    WORKSPACE:
      'All members of the Trello Workspace Workspace can see and edit this board. '
  }

  const [alert, setAlert] = useState({
    open: false,
    severity: 'success',
    message: ''
  })

  const { boardId } = useParams()

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      visibility: type.PRIVATE,
      cover: {
        type: board?.cover?.type,
        value: board?.cover?.value
      }
    }
  })

  useEffect(() => {
    if (board) {
      reset({
        title: board.title || '',
        description: board.description || '',
        visibility: board.visibility || type.PRIVATE,
        cover: {
          type: board?.cover?.type || '',
          value: board?.cover?.value || ''
        }
      })

      if (board?.cover?.type === 'image') {
        const matchedImage = imagesBackground.find(
          (item) => item.src === board.cover.value
        )

        setSelectedBackground(
          matchedImage || {
            key: board.cover.value,
            src: board.cover.value
          }
        )
      } else if (board?.cover?.type === 'color') {
        const matchedColor = backgroundBoardList.find(
          (item) => item.key === board.cover.value
        )

        setSelectedBackground(matchedColor || null)
      } else {
        setSelectedBackground(null)
      }
    }
  }, [board, reset])

  const onSubmit = async (payload) => {
    const res = await fetchUpdateBoardInfoAPI({ _id: boardId, data: payload })

    dispatch(
      // Phải có distpatch thì mới có thể update được trong Redux
      updateCurrentActiveBoard({
        ...board,
        ...res.metadata
      }) // JS tự động merge lại, phía sau sẽ update cho phía trước
    )
    reset({
      title: res.metadata.title || board?.title || '',
      description: res.metadata.description || board?.description || '',
      visibility: res.metadata.visibility || board?.visibility || type.PUBLIC,
      cover: {
        type: res.metadata.cover.type || board?.cover?.type || '',
        value: res.metadata.cover.value || board?.cover?.value || ''
      }
    })

    setAlert({
      open: true,
      severity: 'success',
      message: res.message
    })
  }

  return {
    register,
    handleSubmit,
    errors,
    reset,
    onSubmit,
    type,
    control,
    board,
    alert,
    descriptionType,
    setValue,
    setSelectedBackground,
    selectedBackground
  }
}
