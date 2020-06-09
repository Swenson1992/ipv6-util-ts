import {
  calculate,
  subnet_slashes,
  checkipv6,
  getStartIndex,
  assembleBestRepresentation,
  bigIntToIPv6,
  expand,
  trimColonsFromEnds,
  stripLeadingZeroes,
  removeConsecutiveZeroes,
  prefixBitAndIPv6,
  makeLastAddress,
  formatIPv6Preferred,
  findprefix,
  fillemptysegment,
} from '../index';

test('calculate', () => {
  const result = {
    Compressed_Address: '2001:db8::/48',
    Expanded_Address: '2001:0db8:0000:0000:0000:0000:0000:0000/48',
    Prefix: 'ffff:ffff:ffff:0000:0000:0000:0000:0000',
    First_Address: '2001:db8:0:0:0:0:0:0',
    Last_Address: '2001:db8:0:ffff:ffff:ffff:ffff:ffff',
    Number_MaskIs64: 65536,
  };
  expect(JSON.stringify(calculate('2001:db8::/48'))).toBe(JSON.stringify(result));
});

test('subnet_slashes', () => {
  const result = ['2001:db8::/50', '2001:db8:0:4000::/50', '2001:db8:0:8000::/50', '2001:db8:0:c000::/50'];
  expect(subnet_slashes('2001:db8::/48', 50).toString()).toBe(result.toString());
});

test('checkipv6', () => {
  expect(checkipv6('2401:3480:3000::11')).toBe(true);
  expect(checkipv6('aaaa:12121:3000:0:0:0')).toBe(false);
});

test('getStartIndex', () => {
  expect(getStartIndex('2001:db8::/48')).toBe('42540766411282592856903984951653826560');
});

test('assembleBestRepresentation', () => {
  expect(assembleBestRepresentation(['2001', 'db8', ''])).toBe('2001:db8::');
});

test('bigIntToIPv6', () => {
  expect(bigIntToIPv6('20010db80000c0000000000000000000')).toBe('2001:0db8:0000:c000:0000:0000:0000:0000');
});
test('expand', () => {
  expect(expand('2401:3480:3000::')).toBe('2401:3480:3000:0000:0000:0000:0000:0000');
});
test('trimColonsFromEnds', () => {
  expect(trimColonsFromEnds(['2001', 'db8', '', '']).toString()).toBe(['2001', 'db8', ''].toString());
});
test('stripLeadingZeroes', () => {
  expect(stripLeadingZeroes(['2001', 'db8', '0', '0', '0', '0', '0', '0']).toString()).toBe(
    ['2001', 'db8', '0', '0', '0', '0', '0', '0'].toString(),
  );
});
test('removeConsecutiveZeroes', () => {
  const ipArr = ['2001', 'db8', '0', '0', '0', '0', '0', '0'];
  expect(removeConsecutiveZeroes(ipArr).toString()).toBe(['2001', 'db8', ''].toString());
});
test('prefixBitAndIPv6', () => {
  expect(prefixBitAndIPv6('ffff:ffff:ffff:ffff:0', '2001:db8::')).toBe('2001:db8:0:0:0:0:0:0');
});
test('makeLastAddress', () => {
  expect(makeLastAddress('ffff:ffff:ffff:ffff:0', '2001:db8::')).toBe('2001:db8:0:0:ffff:ffff:ffff:ffff');
});
test('formatIPv6Preferred', () => {
  expect(formatIPv6Preferred('2001:db8::')).toBe('2001:db8::');
});
test('findprefix', () => {
  expect(findprefix(64)).toBe('ffff:ffff:ffff:ffff:0');
});
test('fillemptysegment', () => {
  const result = ['2001', 'db8', '0', '0', '0', '0', '0', '0'];
  expect(fillemptysegment(['2001', 'db8', '']).toString()).toBe(result.toString());
});
