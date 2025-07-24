export const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({
    status: 200,
    message: 'Current user loaded',
    data: {
      email,
      subscription,
    },
  });
};
