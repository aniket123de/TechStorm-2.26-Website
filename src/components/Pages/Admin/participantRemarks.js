export const getParticipantDisplayName = (participant = {}, index = 0) => {
  const name = participant.name || participant.fullName || participant.full_name;
  if (typeof name === 'string' && name.trim()) return name.trim();
  return `Participant ${index + 1}`;
};

export const normalizeParticipantsForRemarks = (registration) => {
  if (!registration || typeof registration !== 'object') return [];

  if (Array.isArray(registration.participants) && registration.participants.length > 0) {
    return registration.participants.map((participant, index) => ({
      ...participant,
      name: participant.name || participant.fullName || participant.full_name || '',
      email: participant.email || participant.emailAddress || '',
      contact: participant.contact || participant.phone || participant.contactNumber || '',
      college: participant.college || participant.collegeName || '',
      year: participant.year || participant.yearOfStudy || '',
      department: participant.department || '',
      order: participant.order ?? index + 1,
      remark: typeof participant.remark === 'string' ? participant.remark : ''
    }));
  }

  const primaryName = registration.fullName || registration.full_name || registration.name || '';
  const primaryEmail = registration.emailAddress || registration.email || '';
  const primaryContact = registration.contactNumber || registration.phone || registration.contact || '';
  const primaryCollege = registration.collegeName || registration.college || registration.institution || '';
  const primaryYear = registration.year || registration.yearOfStudy || '';
  const primaryDepartment = registration.department || '';

  if (
    String(primaryName).trim() ||
    String(primaryEmail).trim() ||
    String(primaryContact).trim() ||
    String(primaryCollege).trim()
  ) {
    return [{
      name: String(primaryName || '').trim(),
      email: String(primaryEmail || '').trim(),
      contact: String(primaryContact || '').trim(),
      college: String(primaryCollege || '').trim(),
      year: String(primaryYear || '').trim(),
      department: String(primaryDepartment || '').trim(),
      order: 1,
      remark: ''
    }];
  }

  return [];
};

export const registrationHasParticipantRemarks = (registration) =>
  normalizeParticipantsForRemarks(registration).some(
    (participant) => typeof participant.remark === 'string' && participant.remark.trim() !== ''
  );

export const getParticipantRemarkCount = (registration) =>
  normalizeParticipantsForRemarks(registration).filter(
    (participant) => typeof participant.remark === 'string' && participant.remark.trim() !== ''
  ).length;
