import { ETypeBlog } from '~/uitls/enum';

export interface Blog {
  id: number;
  creatorId: number;
  imgUrl: string;
  title: string;
  tags: string[];
  content: string;
  view: number;
  like: number;
  isDraft: boolean;
  isPublic: boolean;
  isDelete: boolean;
  createdTime: string;
  updatedTime: string;
  creator: Creator;
  videoUrl: string;
  typeBlog: ETypeBlog;
}

export interface Creator {
  id: number;
  firstName: string;
  lastName: string;
  avatarURL: string;
  governmentOffice: GovernmentOffice;
}

export interface GovernmentOffice {
  category: string;
  prefecture: string;
  name: string;
}
