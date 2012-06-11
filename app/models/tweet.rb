class Tweet
  extend TweetFacets
  include Tire::Model::Persistence

  property :text
  property :created_at, :type => 'date', :default => -> { Time.now }
  property :location
  property :place
  property :source
  property :truncated, :default => false
  property :mention
  property :retweet_count, :default => 0
  property :hashtag
  property :link
  property :user
  property :tags, :default => []
  property :in_reply

  def self.per_page
    10
  end

  def self.search(options)
    options ||= {}
    options[:per_page] ||= self.per_page
    options[:query] = "*:*" if options[:query].nil? || options[:query].empty?

    sort = Array( options[:order] || options[:sort] )

    tire.search do |search|
      search.size( options[:per_page].to_i ) if options[:per_page]
      search.from( options[:page].to_i <= 1 ? 0 : (options[:per_page].to_i * (options[:page].to_i-1)) ) if options[:page] && options[:per_page]

      search.sort do
        sort.each do |t|
          field_name, direction = t.split(' ')
          by field_name, (direction || 'desc')
        end
      end unless sort.empty?

      search.query(&build_query(options))
      facets { |f| search.instance_eval(&f) }

      search.highlight :text

      search.fields Array( options[:fields] ) if options[:fields]
      #raise search.to_json.inspect if options[:filter]
    end
  end

  def to_json
    self.attributes
  end

  protected

  def self.build_query(options)
    Proc.new do
      if options[:filter]
        filters = Yajl::Parser.parse(options[:filter])
        filtered do |filtered|
          filters.each do |f|
            key, value = f.flatten
            filtered.filter key, value
          end
          filtered.query { string options[:query] }
        end
      else
        string options[:query], { :default_field => :text }
      end
    end
  end

end
