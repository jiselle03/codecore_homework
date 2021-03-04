
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'Gryffindor', members: 'Hermione Granger, Harry Potter, Ronald Weasley, Neville Longbottom, Seamus Finnigan, Dean Thomas, Fred Weasley, George Weasley, Lavender Brown, Parvati Patil', logoUrl: 'https://images-na.ssl-images-amazon.com/images/I/915wv-U37QL._SY606_.jpg'},
        {name: 'Ravenclaw', members: 'Luna Lovegood, Cho Chang, Terry Boot, Michael Corner, Padma Patil, Penelope Clearwater, Marietta Edgecombe', logoUrl: 'https://images-na.ssl-images-amazon.com/images/I/91c9b3pZpXL._SY679_.jpg'},
        {name: 'Hufflepuff', members: 'Susan Bones, Hannah Abbott, Cedric Diggory, Nymphadora Tonks, Justin Finch-Fletchley, Ernie Macmillan, Zacharias Smith', logoUrl: 'https://images-na.ssl-images-amazon.com/images/I/61gWZSTmkuL._AC_SL1000_.jpg'},
        {name: 'Slytherin', members: 'Daphne Greengrass, Tracey Davis, Pansy Parkinson, Draco Malfoy, Vincent Crabbe, Gregory Goyle, Theodore Nott, Blaise Zabini', logoUrl: 'https://images-na.ssl-images-amazon.com/images/I/61ABoI-bAcL._AC_SL1100_.jpg'}
      ]);
    });
};