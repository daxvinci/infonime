import React from "react";


export type Ogdata = {
    data:Data[];
    meta:Count;
  }

export type Details = {
  data:Data;
}

export type Data = {
    id:string;
    attributes:Attribs;
    animeImageUrl?:string;
}

// type Image = {
//   posterImage?: {
//     large?: string;
//     small?: string;
//     medium?:string;
//   };
// }

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
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
  darkmode?:boolean;
  limit?:number;
}

export type Paginate = {
  setOffset:React.Dispatch<React.SetStateAction<number>>;
  limit:number;
  offset:number;
  animes:Data[];
  handleLastPage: () => Promise<void>
  // maxCount:Meta;
  currentPage:number;
}

export type Count = {
  count:number;
}


// export type TotalAnimes = {
//   meta:Count;
//   // links:Pages;
// }