export const isJobFavorite = (id: number): boolean => {
  const jobs = [] as number[];
  const favoriteJobs = useLocalStorage('auth.favoriteJobs', '');
  if (favoriteJobs.value.length) {
    const data = favoriteJobs.value.split(',');
    data.forEach((el: string) => {
      jobs.push(Number(el));
    });
  }
  return jobs.includes(id);
};

export const isFavoriteUser = (id: number): boolean => {
  const favoriteUsers = [] as number[];
  const favoritesLocal = useLocalStorage('auth.favorites', '');
  if (favoritesLocal.value.length) {
    const data = favoritesLocal.value.split(',');
    data.forEach((el: string) => {
      favoriteUsers.push(Number(el));
    });
  }
  return favoriteUsers.includes(id);
};

export const isFavoriteBlog = (id: number): boolean => {
  const blogs = [] as number[];
  const favoritesBlogsLocal = useLocalStorage('auth.favoritesBlogs', '');
  if (favoritesBlogsLocal.value.length) {
    const data = favoritesBlogsLocal.value.split(',');
    data.forEach((el: string) => {
      blogs.push(Number(el));
    });
  }
  return blogs.includes(id);
};

export const isFavoriteApplicant = (id: number): boolean => {
  const applicants = [] as number[];
  const favoritesApplicantLocal = useLocalStorage(
    'auth.favoritesApplicant',
    '',
  );
  if (favoritesApplicantLocal.value.length) {
    const data = favoritesApplicantLocal.value.split(',');
    data.forEach((el: string) => {
      applicants.push(Number(el));
    });
  }
  return applicants.includes(id);
};

export const isFavoriteNews = (id: number): boolean => {
  const news = [] as number[];
  const favoritesNewsLocal = useLocalStorage('auth.favoritesNews', '');
  if (favoritesNewsLocal.value.length) {
    const data = favoritesNewsLocal.value.split(',');
    data.forEach((el: string) => {
      news.push(Number(el));
    });
  }
  return news.includes(id);
};
