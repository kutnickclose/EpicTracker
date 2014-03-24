module Api
  class ApiController < ApplicationController
    before_filter :authenticate_user!
  end
end
