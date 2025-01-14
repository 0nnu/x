/*
THIS CODE BY LWJerri#3290
*/
const boxOwners = document.getElementById("owners_list");
/*
you can use this API but if you need to create a custom API check:
https://github.com/Hadi-Koubeissi/discord-web-api
*/
const API = "https://discord-web-api.glitch.me/discord/user/";

const owners = [
    {
        "id": "1116721728555593908",
        "post": "Owner of Site",
        "YTURL": "https://www.youtube.com/@ياحليلك"
    },
    {
        "id": "1070771824289398815",
        "post": "Support Team",
        "YTURL": "https://www.youtube.com/@YossefM629"
    },
    {
        "id": "881073144385921045",
        "post": "Visa Manager",
    },
    {
        "id": "897940883654193233",
        "post": "Nitro Manager",
    },
    {
        "id": "907652699196121169",
        "post": "Right Hand",
    },
    {
        "id": "803039080128577538",
        "post": "Support Team",
        "INSTAURL": "https://www.instagram.com/souhaibffc/"
        
    },
    {
        "id": "1264997930553835611",
        "post": "Support Team",
        "SNAPCHATURL": "https://www.snapchat.com/add/z8y.m"

    }
];

for (let indexOne = 0; indexOne < owners.length; indexOne++) {
    const elementOwners = owners[indexOne];

    $.getJSON(API + elementOwners.id)
        .then(output => {
            if (!output.username || !output.url) {
                setTimeout(function () {
                    document.querySelectorAll(".banner img").forEach(imgs => imgs.src = url + "../assets/bot.png");
                }, 1000);
            }

            // إنشاء العنصر الأساسي
            let ownerList = `
                <div id='trigger' class='card' style='margin: 15px;'>
                    <div class='banner'>
                        <img src='${output.url}' />
                    </div>
                    <br><br><br><br>
                    <h2 class='name'>${output.username}</h2>
                    <div class='title'>
                        <h1 id='trigger2' style='font-size: 26px; color: #000000;'>${elementOwners.post}</h1>
                    </div>
            `;

            // إضافة الأزرار بناءً على الـID
            if (elementOwners.id === "1116721728555593908") {
                ownerList += `
                    <div class='actions'>
                        <div class='follow-btn'>
                            <a href='${elementOwners.YTURL}' target='_blank'>
                                <button style='color: #000000;'>YouTube</button>
                            </a>
                        </div>
                    </div>
                `;
            }

            if (elementOwners.id === "803039080128577538") {
                ownerList += `
                    <div class='actions'>
                        <div class='follow-btn'>
                            <a href='${elementOwners.INSTAURL}' target='_blank'>
                                <button style='color: #000000;'>Insta</button>
                            </a>
                        </div>
                    </div>
                `;
            }

            if (elementOwners.id === "1070771824289398815") {
                ownerList += `
                    <div class='actions'>
                        <div class='follow-btn'>
                            <a href='${elementOwners.YTURL}' target='_blank'>
                                <button style='color: #000000;'>YouTube</button>
                            </a>
                        </div>
                    </div>
                `;
            }

            if (elementOwners.id === "1264997930553835611") {
                ownerList += `
                    <div class='actions'>
                        <div class='follow-btn'>
                            <a href='${elementOwners.SNAPCHATURL}' target='_blank'>
                                <button style='color: #000000;'>Snap</button>
                            </a>
                        </div>
                    </div>
                `;
            }
            // إغلاق العنصر
            ownerList += `</div>`;

            // إضافة العنصر إلى القائمة
            boxOwners.innerHTML += ownerList;
        });
}

function redirectToWebsite() {
    window.location.href = "https://visaapp.org/admin/"; // استبدل الرابط برابط الموقع الذي تريد الانتقال إليه
}
