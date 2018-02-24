// Written by Mubariz Hajimuradov
// (c) all rights reserved
// Contact: mubarizhajimuradov@yahoo.com, muba@mysemle.com


w = window;
d = document;
e = d.documentElement;
b = d.getElementsByTagName('body')[0];

all_cards = {c6 : {l : 0, t : 0}, c7 : {l : -72, t : 0}, c8 : {l : -144, t : 0}, c9 : {l : -216, t : 0}, c10 : {l : -288, t : 0}, c11 : {l : -360, t : 0}, c12 : {l : -432, t : 0}, c13 : {l : -504, t : 0}, c14 : {l : -576, t : 0}, h6 : {l : 0, t : -100}, h7 : {l : -72, t : -100}, h8 : {l : -144, t : -100}, h9 : {l : -216, t : -100}, h10 : {l : -288, t : -100}, h11 : {l : -360, t : -100}, h12 : {l : -432, t : -100}, h13 : {l : -504, t : -100}, h14 : {l : -576, t : -100}, s6 : {l : 0, t : -200}, s7 : {l : -72, t : -200}, s8 : {l : -144, t : -200}, s9 : {l : -216, t : -200}, s10 : {l : -288, t : -200}, s11 : {l : -360, t : -200}, s12 : {l : -432, t : -200}, s13 : {l : -504, t : -200}, s14 : {l : -576, t : -200}, d6 : {l : 0, t : -300}, d7 : {l : -72, t : -300}, d8 : {l : -144, t : -300}, d9 : {l : -216, t : -300}, d10 : {l : -288, t : -300}, d11 : {l : -360, t : -300}, d12 : {l : -432, t : -300}, d13 : {l : -504, t : -300}, d14 : {l : -576, t : -300}, closed : {l : 0, t : -400} };



all_place = ['c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'h6', 'h7', 'h8', 'h9', 'h10', 'h11', 'h12', 'h13', 'h14', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13', 's14', 'd6', 'd7', 'd8', 'd9', 'd10', 'd11', 'd12', 'd13', 'd14'];
your_hand = [];
opponent_hand = [];
center_cards = [];
trash = [];


centerX = 0;
centerY = 0;
centerZindex = 10;

endgame = false;





function onresize() {
    x = w.innerWidth||e.clientWidth||b.clientWidth;
    y = w.innerHeight || e.clientHeight || b.clientHeight;
    
    arrange_all();
}
onresize();
w.addEventListener('resize', onresize);







function move(elem, x, y) {
    elem.style.left = x+"px";
    elem.style.top = y+"px";
}



function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function array_diff(array1, array2) {
    return array1.filter(function(x) { return array2.indexOf(x) < 0 });
}



function get_random_card() {
    random = randomInt(1, 36);
    if(Math.floor(random/9) == 0) {
        number = (random % 9) + 5;
        random_card = "c"+number;
    }
    if(Math.floor(random/9) == 1) {
        number = (random % 9) + 5;
        random_card = "h"+number;
    }
    if(Math.floor(random/9) == 2) {
        number = (random % 9) + 5;
        random_card = "s"+number;
    }
    if(Math.floor(random/9) == 3) {
        number = (random % 9) + 5;
        random_card = "d"+number;
    }
    if((random % 9) == 0) {
        if(random/9==1) { random_card = "c14";}
        if(random/9==2) { random_card = "h14";}
        if(random/9==3) { random_card = "s14";}
        if(random/9==4) { random_card = "d14";}
    }
    return random_card;
}





function correct_your_hand() {
    margin_left = 0;
    z_index = 5;
    i = 6-your_hand.length;
    while(i > 0) {
        if(all_place.length>0) {
            random_card = all_place[randomInt(0, all_place.length-1)];
            all_place.splice(all_place.indexOf(random_card), 1);
            your_hand.push(random_card);
            random_c = d.getElementById(random_card);
            random_c.className = 'card your';
            random_c.setAttribute('data-open', 'yes');
            move(random_c, (x/2-300+margin_left), (y-130));
            position = all_cards[random_card];
            random_c.style.backgroundPosition = position.l+"px "+position.t+"px";
            random_c.style.zIndex = z_index;
            margin_left = margin_left + 30;
            z_index = z_index + 1;
            i = 6-your_hand.length;
        }
        else {
            if(endgame === false) {
                your_hand.push(trump_card.id);
                trump_card.className = 'card opponent';
                move(trump_card, (x/2-300+margin_left), 30);
                trump_card.style.zIndex = z_index;
                margin_left = margin_left + 30;
                z_index = z_index + 1;
                endgame = true;
            }
            i = 0;
        }
    }
}





function correct_opponent_hand() {
    margin_left = 0;
    z_index = 4;
    i = 6-opponent_hand.length;
    while(i > 0) {
        if(all_place.length > 0) {
            random_card = all_place[randomInt(0, all_place.length-1)];
            all_place.splice(all_place.indexOf(random_card), 1);
            opponent_hand.push(random_card);
            random_c = d.getElementById(random_card);
            random_c.className = 'card opponent';
            move(random_c, (x/2-300+margin_left), 30);
            random_c.style.zIndex = z_index;
            margin_left = margin_left + 30;
            z_index = z_index + 1;
            i = 6-opponent_hand.length;
        }
        else {
            if(endgame === false) {
                opponent_hand.push(trump_card.id);
                trump_card.className = 'card opponent';
                move(trump_card, (x/2-300+margin_left), 30);
                trump_card.style.zIndex = z_index;
                position = all_cards['closed'];
                trump_card.style.backgroundPosition = position.l+"px "+position.t+"px";
                margin_left = margin_left + 30;
                z_index = z_index + 1;
                endgame = true;
            }
            i = 0;
        }
    }
}






function who_starts(trump) {
    t_chr = trump.substr(0, 1);
    t_num = trump.substr(1, 2);
    your_trumps = [];
    opponent_trumps = [];
    
    for(i=0; i<your_hand.length; i++) {
        if(your_hand[i].substr(0, 1) == t_chr) {
            your_trumps.push(your_hand[i].substr(1, 2));
        }
    }
    
    for(i=0; i<opponent_hand.length; i++) {
        if(opponent_hand[i].substr(0, 1) == t_chr) {
            opponent_trumps.push(opponent_hand[i].substr(1, 2));
        }
    }
    
    if(your_trumps.length > 0 || opponent_trumps.length >0) {
        if(your_trumps.length > 0 && opponent_trumps.length > 0) {
            your_smallest_trump = Math.min.apply(Math, your_trumps);
            opponent_smallest_trump = Math.min.apply(Math, opponent_trumps);
            
            if(your_smallest_trump < opponent_smallest_trump) {
                return 'you';
            }
            else {
                return 'opponent';
            }
        }
        if(your_trumps.length == 0) {
            return 'opponent';
        }
        if(opponent_trumps.length == 0) {
            return 'you';
        }
    }
    else {
        return 'opponent';
    }
}





function smallest_card(trump_card, cards) {
    trump_letter = trump_card.substr(0, 1);
    
    trump_cards = [];
    regular_cards = [];
    
    for(i=0; i<cards.length; i++) {
        if(cards[i].substr(0, 1) == trump_letter) {
            trump_cards.push(cards[i]);
        }
        else {
            regular_cards.push(cards[i]);
        }
    }
    
    if(regular_cards.length == 0) {
        trump_card_nums = [];
        
        for(i=0; i<trump_cards.length; i++) {
            trump_card_nums.push(trump_cards[i].substr(1));
        }
        
        smallest_card_id = trump_letter + Math.min.apply(Math, trump_card_nums);
        return smallest_card_id;
    }
    else {
        smallest_card_id = regular_cards[0];
        
        for(i=0; i<regular_cards.length; i++) {
            if(parseInt(regular_cards[i].substr(1)) < parseInt(smallest_card_id.substr(1))) {
                smallest_card_id = regular_cards[i];
            }
        }
        
        return smallest_card_id;
    }
}





function smallest_card_td(trump_card, cards, card) {
    trump_cards_td = [];
    regular_cards_td = [];
    
    for(i=0; i<cards.length; i++) {
        if( cards[i].substr(0, 1) == trump_card.substr(0, 1) && parseInt(cards[i].substr(1)) > parseInt(card.substr(1)) ) {
            trump_cards_td.push(cards[i]);
        }
        else if( (cards[i].substr(0, 1) == card.substr(0, 1)) && (cards[i].substr(0, 1) != trump_card.substr(0, 1)) && (parseInt(cards[i].substr(1)) > parseInt(card.substr(1))) ) {
            regular_cards_td.push(cards[i]);
        }
    }
    
    if(trump_cards_td.length == 0 && regular_cards_td.length == 0) {
        return "take";
    }
    else if(trump_cards_td.length != 0 && regular_cards_td.length == 0) {
        return smallest_card(trump_card, trump_cards_td);
    }
    else {
        return smallest_card(trump_card, regular_cards_td);
    }
}





function opponent_move(act, trump_card, card) {
    if(act == "attack") {
        opp_smallest_card = smallest_card(trump_card, opponent_hand);
        center_cards.push(opp_smallest_card);
        opponent_hand.splice(opponent_hand.indexOf(opp_smallest_card), 1);
        opp_smallest_cardObj = d.getElementById(opp_smallest_card);
        move(opp_smallest_cardObj, (x/2-400+centerX), (y/2-50+centerY));
        centerX += 30;
        opp_smallest_cardObj.className = "card center";
        opp_smallest_cardObj.setAttribute('data-open', 'yes');
        position = all_cards[opp_smallest_card];
        opp_smallest_cardObj.style.backgroundPosition = position.l+"px "+position.t+"px";
        opp_smallest_cardObj.style.zIndex = centerZindex;
        centerZindex += 1;
        turn = "you";
        d.getElementById("pass").style.display = "none";
        d.getElementById("take").style.display = "block";
            
        if(opponent_hand.length == 0) {
            you_lose();
        }
    }
    else if(act == "defend") {
        opp_smallest_card_td = smallest_card_td(trump_card, opponent_hand, card);
        if(opp_smallest_card_td == "take") {
            take();
        }
        else {
            center_cards.push(opp_smallest_card_td);
            opponent_hand.splice(opponent_hand.indexOf(opp_smallest_card_td), 1);
            opp_smallest_card_tdObj = d.getElementById(opp_smallest_card_td);
            move(opp_smallest_card_tdObj, (x/2-400+centerX), (y/2-50+centerY));
            centerX += 80;
            opp_smallest_card_tdObj.className = "card center";
            opp_smallest_card_tdObj.setAttribute('data-open', 'yes');
            position = all_cards[opp_smallest_card_td];
            opp_smallest_card_tdObj.style.backgroundPosition = position.l+"px "+position.t+"px";
            opp_smallest_card_tdObj.style.zIndex = centerZindex;
            centerZindex += 1;
            turn = "you";
            d.getElementById("pass").style.display = "block";
            d.getElementById("take").style.display = "none";
            
            if(opponent_hand.length == 0) {
                you_lose();
            }
        }
    }
    arrange_cards();
    arrange_control();
}




function your_move(card, trump_card) {
    if((center_cards.length % 2) == 0) {
        // Attack
        function attack() {
            move(card, (x/2-400+centerX), (y/2-50+centerY));
            centerX += 30;
            card.className = "card center";
            card.style.zIndex = centerZindex;
            centerZindex += 1;
            center_cards.push(card.id);
            your_hand.splice(your_hand.indexOf(card.id), 1);
            turn = "opponent";
            opponent_move("defend", trump_card, card.id);
            
            if(your_hand.length == 0) {
                you_win();
            }
        }
        
        if(center_cards.length == 0) {
            attack();
        }
        else {
            center_card_nums = [];
            for(i=0; i<center_cards.length; i++) {
                center_card_nums.push(center_cards[i].substr(1));
            }
            if(center_card_nums.indexOf(card.id.substr(1)) >= 0) {
                attack();
            }
        }
    }
    else {
        // Defend
        card_letter = card.id.substr(0, 1);
        card_num = parseInt(card.id.substr(1));
        c_card_letter = center_cards[center_cards.length-1].substr(0, 1);
        c_card_num = parseInt(center_cards[center_cards.length-1].substr(1));
        trump_letter = trump_card.substr(0, 1);
        
        deep_shit = ((card_letter == c_card_letter) && (card_num > c_card_num)) || (c_card_letter != trump_letter && card_letter == trump_letter);
        if(deep_shit) {
            move(card, (x/2-400+centerX), (y/2-50+centerY));
            centerX += 30;
            card.className = "card center";
            card.style.zIndex = centerZindex;
            centerZindex += 1;
            center_cards.push(card.id);
            your_hand.splice(your_hand.indexOf(card.id), 1);
            turn = "opponent";
            pass();
            
            if(your_hand.length == 0) {
                you_win();
            }
        }
    }
    arrange_cards();
    arrange_control();
}





function arrange_cards() {
    margin_left = 0;
    z_index = 5;
    for(i=0; i<opponent_hand.length; i++) {
        card = d.getElementById(opponent_hand[i]);
        move(card, (x/2-((30*opponent_hand.length+42)/2)+margin_left), (30));
        card.style.zIndex = z_index;
        position = all_cards['closed'];
        card.style.backgroundPosition = position.l+"px "+position.t+"px";
        margin_left += 30;
        z_index += 1;
    }
    
    margin_left = 0;
    z_index = 5;
    for(i=0; i<your_hand.length; i++) {
        card = d.getElementById(your_hand[i]);
        move(card, (x/2-((30*your_hand.length+42)/2)+margin_left), (y-130));
        card.className = "card your";
        card.style.zIndex = z_index;
        margin_left += 30;
        z_index += 1;
    }
}




function arrange_control() {
    control = d.getElementById("control");
    move(control, (x/2-350+centerX), (y/2-50));
}




function arrange_trash() {
    for(i=0; i<trash.length; i++) {
        card = d.getElementById(trash[i]);
        card.style.display = "none";
        move(card, 0, 0);
    }
}




function arrange_all() {
    arrange_cards();
    
    centerX = 0;
    centerY = 0;
    centerZindex = 10;
    
    for(i=0; i<center_cards.length; i++) {
        card = d.getElementById(center_cards[i]);
        move(card, (x/2-400+centerX), (y/2-50+centerY));
        if(i%2 == 0) {
            centerX += 30;
        }
        else {
            centerX += 80;
        }
        card.style.zIndex = centerZindex;
        centerZindex += 1;
    }
    
    for(i=0; i<all_place.length; i++) {
        card = d.getElementById(all_place[i]);
        card.style.left = (x-100)+"px";
        card.style.top = (y/2-50)+"px";
    }
    
    if(typeof(trump_card) !== 'undefined') {
        trump_card.style.left = (x-140)+"px";
        trump_card.style.top = (y/2-50)+"px";
    }
    
    arrange_control();
}




function take() {
    if(turn == "you") {
        i =0;
        while(center_cards.length>0) {
            your_hand.push(center_cards[i]);
            center_cards.splice(center_cards.indexOf(center_cards[i]), 1);
        }
        correct_opponent_hand();
        turn = "opponent";
        centerX = 0;
        centerY = 0;
        opponent_move("attack", trump);
    }
    else if(turn == "opponent") {
        i=0;
        while(center_cards.length>0) {
            opponent_hand.push(center_cards[i]);
            center_cards.splice(center_cards.indexOf(center_cards[i]), 1);
        }
        turn = "you";
        centerX = 0;
        centerY = 0;
        correct_your_hand();
        d.getElementById("pass").style.display = "none";
    }
    arrange_cards();
}




function pass() {
    if(turn == "you") {
        while(center_cards.length>0) {
            trash.push(center_cards[0]);
            center_cards.splice(0, 1);
        }
        arrange_trash();
        d.getElementById("pass").style.display = "none";
        correct_opponent_hand();
        correct_your_hand();
        turn = "opponent";
        centerX = 0;
        centerY = 0;
        opponent_move("attack", trump);
    }
    else if(turn == "opponent") {
        while(center_cards.length>0) {
            trash.push(center_cards[0]);
            center_cards.splice(0, 1);
        }
        arrange_trash();
        d.getElementById("take").style.display = "none";
        correct_opponent_hand();
        correct_your_hand();
        turn = "you";
        centerX = 0;
        centerY = 0;
    }
}




function you_win() {
    winInn = '<div class="a">\
                <div class="b">\
                    <span class="c">You win!</span>\
                    <span class="kt">I have wasted 10 hours to create this game and you just wasted 5-6 minutes of your life by playing it.. Now you have two option.</span>\
                    <center>\
                        <span class="btt" onclick="play_again();">Play again</span>\
                        <span class="btt" onclick="close();">Close</span>\
                    </center>\
                </div>\
            </div>';
    b.innerHTML += winInn;
}




function you_lose() {
    loseInn = '<div class="a">\
                <div class="b">\
                    <span class="c">You lose!</span>\
                    <span class="kt">I have wasted 10 hours to create this game and you just wasted 5-6 minutes of your life by playing it.. Now you have two option.</span>\
                    <center>\
                        <span class="btt" onclick="play_again();">Play again</span>\
                        <span class="btt" onclick="close();">Close</span>\
                    </center>\
                </div>\
            </div>';
    b.innerHTML += loseInn;
}




function play_again() {
    location.reload();
}




function close() {
    
}










d.getElementById("pass").style.display = "none";
d.getElementById("take").style.display = "none";


cards = d.getElementsByClassName('card');
for(i = 0; i < cards.length; i++) {
    cards[i].style.left = (x-100)+"px";
    cards[i].style.top = (y/2-50)+"px";
    
    card_nm = cards[i].getAttribute('data-card');
    card_open = cards[i].getAttribute('data-open');
    if(card_open == 'yes') {
        position = all_cards[card_nm];
    }
    else {
        position = all_cards['closed'];
    }
    cards[i].style.backgroundPosition = position.l+"px "+position.t+"px";
}




trump = get_random_card();

trump_card = d.getElementById(trump);
trump_card.className = "card trump";
trump_card.setAttribute("data-open", "yes");
position = all_cards[trump];
trump_card.style.backgroundPosition = position.l+"px "+position.t+"px";
trump_card.style.left = (x-140)+"px";

all_place.splice(all_place.indexOf(trump), 1);



correct_opponent_hand();
correct_your_hand();
arrange_cards();
arrange_control();


turn = who_starts(trump);


if(turn == "opponent") {
    opponent_move("attack", trump_card.id);
}

w.addEventListener("click", function(event) {
    if(event.target.className == "card your" && turn == "you") {
        your_move(event.target, trump_card.id);
    }
});


d.getElementById('take').onclick = take;
d.getElementById('pass').onclick = pass;










