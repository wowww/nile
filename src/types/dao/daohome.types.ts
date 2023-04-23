import { ReactElement } from 'react';
import NileUserAccount from "@/models/nile/user/NileUserAccount";

export type NileDaoTimeline = {
  type: string;
  time: string;
  desc: ReactElement | string;
  listTypeDesc?: { hasInnerList: boolean; desc: string; innerList?: string[] }[];
  link?: string;
  linkText?: string;
  isNew: boolean;
};

export type NileDaoDiscuss = {
  id: string;
  title?: string;
  author?: NileUserAccount;
  desc?: string;
  createdAt?: string;
  participants?: NileUserAccount[];
}

export type NileDaoAgora = {
  id: string;
  title?: string;
  suggest?: NileUserAccount;
  startAt?: string;
  endAt?: string;
  quorum?: number;
  total?: number;
  currentVote?: number;
  replies?: NileUserAccount[];
}