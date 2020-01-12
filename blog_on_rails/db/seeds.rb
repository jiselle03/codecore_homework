# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Post.destroy_all()
Comment.destroy_all()
User.destroy_all()

PASSWORD = "supersecret"  

super_user = User.create( 
    name: "Arya Stark", 
    email: "noone@winterfell.gov", 
    password: PASSWORD,
    is_admin: true
) 

25.times do 
    name = Faker::Movies::HarryPotter.character
    email = "#{name.downcase.delete(" ")}@hogwarts.edu"
    User.create( 
        name: name,  
        email: email, 
        password: PASSWORD
    )
end 

users = User.all 
puts Cowsay.say("Created #{users.count} users", :tux)  
puts "Login with #{super_user.email} and password of '#{PASSWORD}'"

250.times do
    user = users.sample 
    p = Post.create(
        title: Faker::TvShows::Buffy.episode,
        body: Faker::Lorem.paragraph(sentence_count: 5, supplemental: true, random_sentences_to_add: 4),
        created_at: Faker::Date.backward(days:365 * 5),
        updated_at: Faker::Date.backward(days:365 * 5),
        user_id: user.id
    )
    if p.valid?
        p.comments = rand(0..10).times.map do
            user = users.sample 
            Comment.new(
                body: Faker::TvShows::Buffy.quote, 
                created_at: Faker::Date.backward(days:365 * 5),
                user_id: user.id
            )
        end
    end
end

puts Cowsay.say("Generated #{Post.count} posts and #{Comment.count} comments", :dragon)