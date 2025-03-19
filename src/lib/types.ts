import React from "react";


export type Ogdata = {
    data:Data[]
  }

export type Data = {
    id:string;
    attributes:Attribs
}

export type Attribs = {
  slug: string;
  synopsis?: string;
  averageRating?: string;
  episodeCount?: number;
  showType?: string;
  titles?:{
      en:string;
      en_jp:string;
      ja_jp:string;

  }
  posterImage?: {
    tiny?: string;
    large?: string;
    small?: string;
    medium?:string;
    original?: string;
  };
  status:string;
  [key: string]: unknown; // Allow additional unknown properties
};

export type Attr = {
  animes : Data[];
  error : object | string | undefined;
  loading:boolean;
  darkmode:boolean;
} 


export type AnimeDetails = {
    imageUrl: string;
    slug: string;
    synopsis: string;
    title?: {
        en?:string;
        en_jp?:string;
        ja_jp?:string;
    }
    averageRating?: string;
    episodeCount?: number;
    status?: string;
    // genre: string[];
    startDate?: string;
    endDate?: string;
    posterImage?: {
        tiny?: string;
        large?: string;
        small?: string;
        medium?:string;
        original?: string;
      };
  }

export type DetailsData = {
    data:InsideData
  }

export type InsideData = {
        id:string;
        type?:string;
        attributes:AnimeDetails
}

export type Bool = {
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
  darkmode?:boolean;
}

export type Paginate = {
  setAnimes:React.Dispatch<React.SetStateAction<Data[]>>;
  setOffset:React.Dispatch<React.SetStateAction<number>>;
  limit:number;
  offset:number;
  animes:Data[];
}