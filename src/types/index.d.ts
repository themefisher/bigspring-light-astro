export type TIndexData = {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    description: string;
    authors: string[];
    categories: string[];
    tags: string[];
  };
  render: () => Promise<void>;
};

export type TPostData = {
  title: string;
  meta_title: string;
  description: string;
  image: string;
};

export type TPost = {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: PostData;
  render: () => Promise<void>;
};

export type TFaqItem = {
  title: string;
  answer: string;
};

export type TPostType = {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    draft: boolean;
    faqs: FaqItem[];
    description?: string;
    call_to_action?: TCallToAction;
    plans?: TPlan[];
  };
};

export type TPlan = {
  title: string;
  subtitle: string;
  price: number;
  recommended: boolean;
  type: string;
  features: string[];
  button: {
    label: string;
    link: string;
  };
};

export type TCallToAction = {
  title: string;
  content: string;
  image: string;
  button: {
    enable: boolean;
    label: string;
    link: string;
  };
};
