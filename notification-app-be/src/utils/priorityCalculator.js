const TYPE_WEIGHTS = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function calculatePriority(notification) {
  const weight = TYPE_WEIGHTS[notification.Type] || 0;

  const timestamp =
    new Date(notification.Timestamp).getTime();

  return weight * 1000000000 + timestamp;
}

module.exports = {
  calculatePriority,
};