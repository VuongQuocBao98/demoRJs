import _mock from '../_mock';

// ----------------------------------------------------------------------

export const _bankingContacts = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  avatar: _mock.image.avatar(index),
}));

export const _bankingCreditCard = [
  {
    id: _mock.id(2),
    balance: 23432.03,
    cardType: 'mastercard',
    cardHolder: _mock.name.fullName(2),
    cardNumber: '**** **** **** 3640',
    cardValid: '11/22',
  },
  {
    id: _mock.id(3),
    balance: 18000.23,
    cardType: 'visa',
    cardHolder: _mock.name.fullName(3),
    cardNumber: '**** **** **** 8864',
    cardValid: '11/25',
  },
  {
    id: _mock.id(4),
    balance: 2000.89,
    cardType: 'mastercard',
    cardHolder: _mock.name.fullName(4),
    cardNumber: '**** **** **** 7755',
    cardValid: '11/22',
  },
];

export const _bankingRecentTransitions = [
  {
    email: _mock.email(2),
    id: _mock.id(2),
    name: _mock.name.fullName(2),
    avatar: _mock.image.avatar(8),
    type: 'Income',
    message: 'Receive money from',
    category: 'Annette Black',
    status: 'none',
  },
  {
    email: _mock.email(2),
    id: _mock.id(3),
    name: _mock.name.fullName(3),
    avatar: _mock.image.avatar(9),
    type: 'Expenses',
    message: 'Payment for',
    category: 'Courtney Henry',
    status: 'completed',
  },
  {
    email: _mock.email(2),
    id: _mock.id(4),
    name: _mock.name.fullName(4),
    avatar: _mock.image.avatar(12),
    type: 'Receive',
    message: 'Payment for',
    category: 'Theresa Webb',
    status: 'none',
  },
  {
    email: _mock.email(2),
    id: _mock.id(3),
    name: _mock.name.fullName(3),
    avatar: _mock.image.avatar(9),
    type: 'Expenses',
    message: 'Payment for',
    category: 'Courtney Henry',
    status: 'completed',
  },
  {
    email: _mock.email(2),
    id: _mock.id(3),
    name: _mock.name.fullName(3),
    avatar: _mock.image.avatar(9),
    type: 'Expenses',
    message: 'Payment for',
    category: 'Courtney Henry',
    status: 'completed',
  },
  {
    email: _mock.email(2),
    id: _mock.id(3),
    name: _mock.name.fullName(3),
    avatar: _mock.image.avatar(9),
    type: 'Expenses',
    message: 'Payment for',
    category: 'Courtney Henry',
    status: 'completed',
  },
];
