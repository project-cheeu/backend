import Auth from './auth';
import Company from './company';
import Assets from './company.assets';
import Member from './member';
import Dept from './dept';
import File from './file';
import Customer from './customer';
import Medical from './medical.table';
import Manager from './manager';
import Survey from './survey';
import Dashboard from './dashboard';
import Statistics from './statistics';
import Alimtalk from './alimtalk';
import Agreement from './agreement';
import Reservation from './reservation';
import CompanySchedule from './company.schedule';
import CompanyVideo from './company.video';
import CompanyNotice from './company.notice';
import Wait from './wait';
export const routes = [
  ...Auth,
  ...Company,
  ...Assets,
  ...Member,
  ...Dept,
  ...File,
  ...Customer,
  ...Medical,
  ...Manager,
  ...Survey,
  ...Dashboard,
  ...Statistics,
  ...Alimtalk,
  ...Agreement,
  ...Reservation,
  ...CompanySchedule,
  ...CompanyVideo,
  ...CompanyNotice,
  ...Wait,
];
