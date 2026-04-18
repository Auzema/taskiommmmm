let apiRoot = 'http://localhost:8017'
// console.log('import.meta.env: ', import.meta.env)
// console.log('process.env: ', process.env)

const mode = import.meta.env.MODE || process.env.BUILD_MODE

// Ưu tiên dùng biến env để dễ đổi endpoint theo từng môi trường
if (import.meta.env.VITE_API_ROOT) {
  apiRoot = import.meta.env.VITE_API_ROOT
}

// Môi trường Dev sẽ chạy localhost với port 8017
if (!apiRoot && mode === 'dev') {
  apiRoot = 'http://localhost:8017'
}

// Môi trường Production sẽ cần api endpoint chuẩn của các bạn
if (!apiRoot && mode === 'production') {
  // Lưu ý: Đây là domain ví dụ sau khi Deploy Production (xem video 75 và video 76 để hiểu rõ kiến thức phần này, còn hiện tại mình đã xóa domain này rồi, đừng cố truy cập làm gì =))
  apiRoot = 'https://trello-api-0gbu.onrender.com'
}
// console.log('🚀 ~ file: constants.js:7 ~ apiRoot:', apiRoot)
export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12

export const CARD_MEMBER_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
}
