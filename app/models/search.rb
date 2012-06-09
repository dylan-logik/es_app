class Search
  include Tire::Model::Persistence

  property :query, type: String
  property :total, type: Integer, default: 0
  property :facets, type: Array, default: []
end
