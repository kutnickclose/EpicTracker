json.array!(@weeks) do |week|
  json.partial!("api/weeks/week", :week => week)
end