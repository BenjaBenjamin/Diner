        let personer = [];
        let filter = "alle";
        document.addEventListener("DOMContentLoaded", start);
        function start() {
            let dest = document.querySelector("#retter");
            let temp = document.querySelector("template");
            async function getJson() {
                let jsonData = await fetch("http://helf-kea.dk//google_spread_cleaner/clean_up_spreadsheet.php?id=1EjoUet6Sz6djj10FjF7vUHQrAl2Jx8YDnoetkGxrE9I");
                personer = await jsonData.json();
                personer.sort((a, b) => {
                    return a.id - b.id
                })
                visRetter();
            }
            function visRetter() {
                dest.innerHTML = "";
                personer.forEach(eachRet => {
                    if (filter == "alle" || filter == eachRet.kategori) {
                        let template = `<div class="vis">
<img class="stortbillede" src = "imgs/${eachRet.billede}.jpg"><h2>${eachRet.navn}</h2><p class="kort">${eachRet.kort}</p><p class="pris"><br><br><br>Pris: ${eachRet.pris}</p>`;
                        dest.insertAdjacentHTML("beforeend", template);
                        dest.lastElementChild.addEventListener("click", åbn);
                        function åbn() {
                            document.querySelector("#indhold").innerHTML =
                                `<div class="pop">
<h2>${eachRet.navn}</h2><img class="billede" src = "imgs/${eachRet.billede}.jpg"><p>${eachRet.kort}</p><p class="poppris"><br><br><br>Pris: ${eachRet.pris}</p>`;
                            document.querySelector("#popup").style.display = "block";
                        }
                    }
                })
            }
            //function visRetter slut
            document.querySelector("#luk button").addEventListener("click", () => {
                document.querySelector("#popup").style.display = "none";
            })
            document.querySelectorAll(".filter").forEach(elm => {
                elm.addEventListener("click", filtrering);
            })
            function filtrering() {
                filter = this.getAttribute("data-retter");
                document.querySelector("h1").textContent = this.textContent;
                document.querySelectorAll(".filter").forEach(elm => {
                    elm.classList.remove("valgt");
                })
                this.classList.add("valgt");
                visRetter();
            }
            getJson()
        }
