class Document
  include Tire::Model::Search
  include Tire::Model::Callbacks
  include Tire::Model::Persistence
end
