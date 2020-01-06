# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.destroy_all()
Comment.destroy_all()

100.times do
    p = Post.create(
        title: Faker::TvShows::Buffy.episode,
        body: Faker::Lorem.paragraph(sentence_count: 5, supplemental: true, random_sentences_to_add: 4),
        created_at: Faker::Date.backward(days:365 * 5),
        updated_at: Faker::Date.backward(days:365 * 5)
    )
    if p.valid?
        p.comments = rand(0..10).times.map do
            Comment.new(
                body: Faker::TvShows::Buffy.quote, 
                created_at: Faker::Date.backward(days:365 * 5),
            )
        end
    end
end

puts Cowsay.say("Generated #{Post.count} posts and #{Comment.count} comments", :dragon)