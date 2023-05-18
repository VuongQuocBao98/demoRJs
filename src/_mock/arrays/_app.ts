import _mock from '../_mock';
import { randomNumberRange, randomInArray } from '../utils';

// ----------------------------------------------------------------------

export const _appRelated = ['Chrome', 'Drive', 'Dropbox', 'Evernote', 'Github'].map(
  (name, index) => ({
    id: _mock.id(index),
    name,
    system: (index === 2 && 'Windows') || (index === 4 && 'Windows') || 'Mac',
    price: index === 0 || index === 2 || index === 4 ? 0 : _mock.number.price(index),
    rating: _mock.number.rating(index),
    review: randomNumberRange(999, 99999),
    shortcut:
      (name === 'Chrome' && '/assets/icons/apps/ic_chrome.svg') ||
      (name === 'Drive' && '/assets/icons/apps/ic_drive.svg') ||
      (name === 'Dropbox' && '/assets/icons/apps/ic_dropbox.svg') ||
      (name === 'Evernote' && '/assets/icons/apps/ic_evernote.svg') ||
      '/assets/icons/apps/ic_github.svg',
  })
);

// ----------------------------------------------------------------------

const provinces = [
  'Hà Nội',
  'Đà Nẵng',
  'TP.HCM',
  'Hải Phòng',
  'Cần Thơ',
  'Đà Lạt',
  'Nha Trang',
  'Huế',
  'Bắc Ninh',
];

export const _appInstalled = provinces.map((country, index) => ({
  id: _mock.id(index),
  name: provinces[index],
  android: randomNumberRange(9999, 99999),
  windows: randomNumberRange(9999, 99999),
  apple: randomNumberRange(9999, 99999),
}));

// ----------------------------------------------------------------------

export const _appAuthors = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  avatar: _mock.image.avatar(index),
  favourite: randomNumberRange(9999, 19999),
}));

// ----------------------------------------------------------------------

export const _appInvoices = [...Array(5)].map((_, index) => ({
  id: `${Date.now() + index}`,
  price: _mock.number.price(index),
  category: randomInArray(['Android', 'Mac', 'Windows']),
  status: randomInArray(['paid', 'out_of_date', 'in_progress']),
}));

// ----------------------------------------------------------------------

export const _appFeatured = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  title: [
    'Harry Potter and the Deathly Hallows - Part 2',
    'Disney Zombies 2',
    'Lightroom mobile - Koloro',
  ][index],
  description: _mock.text.title(index),
  image: _mock.image.cover(index),
}));
