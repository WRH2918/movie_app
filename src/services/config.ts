// API配置文件
// 在实际使用中，请替换为您自己的TMDB API密钥
// 注意：不要将实际的API密钥提交到版本控制系统

export const API_CONFIG = {
  API_KEY: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzIxOWU4NjFiOGM5MmNiNDQ1NmU4NzkwOTc3ZDAzMSIsIm5iZiI6MTc2NDIyMTc0Ny4zMTEsInN1YiI6IjY5MjdlMzMzMWQyNGFkYjY4N2VhYTMzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EFz9dUFSLLA3eCrpZ309xkgHW7t_ApMMs0BuKh_IRD8', // 请替换为您的API密钥
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
};

// 图像大小配置
export const IMAGE_SIZES = {
  small: 'w300',
  medium: 'w500',
  large: 'original',
};
