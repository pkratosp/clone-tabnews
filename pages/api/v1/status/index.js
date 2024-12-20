function status(request, response) {
  response.status(200).json({
    ok: true,
  });
}

export default status;
