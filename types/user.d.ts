export type IUserData = {
  label: string;
  icon: string;
  userdata: IUser;
};

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

export interface IGeo {
  lat: string;
  lng: string;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type ITodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export interface IAlbum {
  userId: number;
  id: number;
  title: string;
}

export interface IAlbomImage {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type TArrayTodos = Array<ITodo>;
export type TArrayAlbums = Array<IAlbum>;
export type TArrayAlbomImage = Array<IAlbomImage>;
export type TArrayPhotos = Array<TArrayAlbomImage>;

export type TUserData = {
  userId: string | number;
  userdata: {
    todos: TArrayTodos;
    albums: TArrayAlbums;
    images: TArrayPhotos;
  };
};
