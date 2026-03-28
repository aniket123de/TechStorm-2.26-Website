const INTERNAL_COLLEGE_MATCHERS = [
  'b. p. poddar',
  'b.p. poddar',
  'bppimt',
  'bp poddar',
];

export const EVENT_REVENUE_CONFIG = {
  'code-bee': {
    name: 'Code-Bee',
    internalFee: 80,
    externalFee: 80,
    unit: 'team',
    manualOnly: true,
  },
  'hack storm': {
    name: 'Hack Storm',
    internalFee: 0,
    externalFee: 0,
    unit: 'team',
  },
  technomania: {
    name: 'TechnoMania',
    internalFee: 200,
    externalFee: 250,
    unit: 'team',
  },
  omegatrix: {
    name: 'Omegatrix',
    internalFee: 50,
    externalFee: 60,
    unit: 'participant',
  },
  'tech hunt': {
    name: 'Tech Hunt',
    internalFee: 200,
    externalFee: 200,
    unit: 'team',
  },
  'ro-navigator': {
    name: 'Ro-Navigator',
    internalFee: 350,
    externalFee: 400,
    unit: 'team',
  },
  'ro-sumo': {
    name: 'Ro-Sumo',
    internalFee: 350,
    externalFee: 400,
    unit: 'team',
  },
  'ro-combat': {
    name: 'Ro-Combat',
    internalFee: 800,
    externalFee: 800,
    unit: 'team',
  },
  'ro-soccer': {
    name: 'Ro-Soccer',
    internalFee: 350,
    externalFee: 400,
    unit: 'team',
  },
  'ro-terrance': {
    name: 'Ro-Terrance',
    internalFee: 350,
    externalFee: 400,
    unit: 'team',
  },
  'creative canvas': {
    name: 'Creative Canvas',
    internalFee: 100,
    externalFee: 150,
    unit: 'team',
  },
  'passion with reels': {
    name: 'Passion with Reels',
    internalFee: 150,
    externalFee: 200,
    unit: 'team',
  },
  'forza horizon': {
    name: 'Forza Horizon',
    internalFee: 80,
    externalFee: 100,
    unit: 'participant',
  },
  'ea fc mobile': {
    name: 'EA FC MOBILE',
    internalFee: 50,
    externalFee: 60,
    unit: 'participant',
  },
  khet: {
    name: 'KHET',
    internalFee: 50,
    externalFee: 50,
    unit: 'participant',
  },
};

const EVENT_ALIASES = {
  codebee: 'code-bee',
  'code bee': 'code-bee',
  'hackstorm': 'hack storm',
  hackstrom: 'hack storm',
  'hack strom': 'hack storm',
  technomania: 'technomania',
  omegatrix: 'omegatrix',
  'tech hunt': 'tech hunt',
  techhunt: 'tech hunt',
  'ro navigator': 'ro-navigator',
  ronavigator: 'ro-navigator',
  'ro sumo': 'ro-sumo',
  rosumo: 'ro-sumo',
  combat: 'ro-combat',
  rocombat: 'ro-combat',
  'ro combat': 'ro-combat',
  'ro soccer': 'ro-soccer',
  rosoccer: 'ro-soccer',
  'ro terrance': 'ro-terrance',
  roterrance: 'ro-terrance',
  creativecanvas: 'creative canvas',
  'creative canvas': 'creative canvas',
  'passion with reels': 'passion with reels',
  passionwithreels: 'passion with reels',
  forzahorizon: 'forza horizon',
  'forza horizon': 'forza horizon',
  eafcmobile: 'ea fc mobile',
  'ea fc mobile': 'ea fc mobile',
  khet: 'khet',
};

const normalizeString = (value) => String(value || '').trim().toLowerCase();

export const normalizeEventKey = (eventName) => {
  const normalized = normalizeString(eventName).replace(/\s+/g, ' ');
  return EVENT_ALIASES[normalized] || normalized;
};

const getParticipantCollege = (participant = {}) =>
  participant.college || participant.collegeName || participant.institution || '';

export const getRegistrationCollege = (registration = {}) => {
  if (registration.collegeName) return registration.collegeName;
  if (registration.college) return registration.college;
  if (registration.institution) return registration.institution;
  if (registration.participants && registration.participants.length > 0) {
    return getParticipantCollege(registration.participants[0]);
  }
  return '';
};

export const isInternalCollege = (collegeName) => {
  const normalized = normalizeString(collegeName);
  return INTERNAL_COLLEGE_MATCHERS.some((matcher) => normalized.includes(matcher));
};

export const isRevenueEligibleRegistration = (registration = {}) => {
  const paymentStatus = normalizeString(registration.paymentStatus);
  const registrationStatus = normalizeString(registration.registrationStatus);

  const paid = paymentStatus === 'confirmed' || paymentStatus === 'verified';
  const activeRegistration = !['cancelled', 'rejected'].includes(registrationStatus);

  return paid && activeRegistration;
};

const createBreakdownSeed = () =>
  Object.values(EVENT_REVENUE_CONFIG).reduce((acc, event) => {
    acc[event.name] = {
      eventName: event.name,
      paidRegistrations: 0,
      internalCount: 0,
      externalCount: 0,
      amount: 0,
      unit: event.unit,
      source: event.manualOnly ? 'manual' : 'registrations',
    };
    return acc;
  }, {});

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0);

const isCancelledRegistration = (registration = {}) => {
  const registrationStatus = normalizeString(registration.registrationStatus);
  return ['cancelled', 'rejected'].includes(registrationStatus);
};

const getPaymentMode = (registration = {}) => normalizeString(registration.paymentMode);
const getPaymentStatus = (registration = {}) => normalizeString(registration.paymentStatus);

const isCashPayment = (registration = {}) => {
  const paymentMode = getPaymentMode(registration);
  return paymentMode === 'cash' || paymentMode === 'offline';
};

const isOnlinePayment = (registration = {}) => getPaymentMode(registration) === 'online';

const shouldCountForRevenue = (registration = {}) => !isCancelledRegistration(registration);

const isPendingCashVerificationRegistration = (registration = {}) => {
  if (isCancelledRegistration(registration)) return false;
  if (!isCashPayment(registration)) return false;
  return getPaymentStatus(registration) !== 'verified';
};

export const calculateRevenueSummary = (registrations = [], codeBeeTeams = 0) => {
  const breakdownMap = createBreakdownSeed();

  registrations.forEach((registration) => {
    const eventKey = normalizeEventKey(registration.eventName);
    const config = EVENT_REVENUE_CONFIG[eventKey];

    if (!config || config.manualOnly) return;

    const collegeName = getRegistrationCollege(registration);
    const internal = isInternalCollege(collegeName);
    const fee = internal ? config.internalFee : config.externalFee;
    const bucket = breakdownMap[config.name];

    if (shouldCountForRevenue(registration)) {
      bucket.paidRegistrations += 1;
      bucket.amount += fee;

      if (internal) {
        bucket.internalCount += 1;
      } else {
        bucket.externalCount += 1;
      }
    }

    if (isPendingCashVerificationRegistration(registration)) {
      bucket.pendingCashVerificationCount = (bucket.pendingCashVerificationCount || 0) + 1;
      bucket.pendingCashVerificationAmount = (bucket.pendingCashVerificationAmount || 0) + fee;
    }
  });

  const normalizedCodeBeeTeams = Math.max(0, Number(codeBeeTeams) || 0);
  const codeBeeConfig = EVENT_REVENUE_CONFIG['code-bee'];
  breakdownMap[codeBeeConfig.name] = {
    ...breakdownMap[codeBeeConfig.name],
    paidRegistrations: normalizedCodeBeeTeams,
    internalCount: 0,
    externalCount: normalizedCodeBeeTeams,
    amount: normalizedCodeBeeTeams * codeBeeConfig.externalFee,
    pendingCashVerificationCount: 0,
    pendingCashVerificationAmount: 0,
  };

  const breakdown = Object.values(breakdownMap).filter(
    (event) =>
      event.amount > 0 ||
      event.pendingCashVerificationAmount > 0 ||
      event.eventName === 'Code-Bee'
  );

  const totalRevenue = breakdown.reduce((sum, event) => sum + event.amount, 0);
  const totalPaidRegistrations = breakdown.reduce((sum, event) => sum + event.paidRegistrations, 0);
  const totalPendingCashVerificationAmount = breakdown.reduce(
    (sum, event) => sum + (event.pendingCashVerificationAmount || 0),
    0
  );
  const totalPendingCashVerificationCount = breakdown.reduce(
    (sum, event) => sum + (event.pendingCashVerificationCount || 0),
    0
  );

  return {
    totalRevenue,
    totalPaidRegistrations,
    codeBeeTeams: normalizedCodeBeeTeams,
    totalPendingCashVerificationAmount,
    totalPendingCashVerificationCount,
    breakdown,
  };
};
