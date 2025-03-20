export type PostType = {
    title: string;
    richText: { json: any }; 
    dateAndTime: string;
    imageCollection?: {
      items: { url: string }[];
    };
    author: string;
  };
  