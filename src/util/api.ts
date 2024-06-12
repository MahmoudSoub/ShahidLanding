import axios, {AxiosResponse} from 'axios';
interface RequestParams {
  id: string;
  pageNumber: number;
  pageSize: number;
  displayedItems: number;
  totalItems: number;
  itemsRequestedStatic: boolean;
}
const base_URL = 'https://api2.shahid.net/proxy/v2.1/';
const editorialEndPoint = 'editorial/carousel';

export const getData = async () => {
  const requestParam = {
    id: 'Main/LEVANT/home/LEV-Home-Hero-SVOD-',
    pageNumber: 0,
    pageSize: 15,
    displayedItems: 0,
    totalItems: 50,
    itemsRequestedStatic: true,
  };
  const countryParam = 'JO';

  const headers = {
    accept: 'application/json;charset=UTF-8',
    uuid: 'ios',
    's-country': 'JO',
    mparticleid: '7489526821984072927',
    language: 'en',
    profile: '{id:,master:1,age:null,ageRestriction:false}',
    'profile-key': '{isAdult:true}',
    'user-agent':
      'Mozilla/5.0 (iPad; CPU OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
  };

  const fullURL = `${base_URL}${editorialEndPoint}?request=${encodeURIComponent(
    JSON.stringify(requestParam),
  )}${countryParam}`;

  try {
    const response: AxiosResponse = await axios.get(fullURL, {headers});
    return response.data.editorialItems;
  } catch (error) {
    return [];
  }
};
