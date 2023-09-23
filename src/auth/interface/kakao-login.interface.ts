/* Kakao Strategy */
type KakaoUser = {
  email: string;
  nickname: string;
  photo: string;
};

export type KakaoRequest = Request & { user: KakaoUser };
