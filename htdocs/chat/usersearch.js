document.addEventListener("DOMContentLoaded", function(){
    const   form_srch   = document.getElementById("form-usersearch"),
        srch_batchSize  = form_srch.querySelector("#batchsize"),
        srch_cmpAgainst = form_srch.querySelector("#cmpari"),
        srch_ordBy      = form_srch.querySelector("#orderBy"),
        nameDisplay     = document.getElementById("modal-user-usernamedisplay"),
        form_tryUsername    = document.getElementById("form-modal-tryusername"),
        pginatBottom_ul = document.getElementById("paginationBottom"),
        pginat_lknTemplate   = pginatBottom_ul.querySelector("template").content.querySelector(".page-item"),
        rndName_btn     = document.getElementById("rndName_btn"),
        form_decpt      = document.getElementById("form-modal-description"),
        decpt_txt       = document.getElementById("usr_description"),
        decpt_btn       = document.getElementById("btn_description"),
        usercard_container  = document.getElementById("usercards"),
        usercard_template    = usercard_container.querySelector("template").content.querySelector(".card") //.cloneNode(true) //document.querySelector("#card-template > div.card").cloneNode(true)
        ;
        // urlParams       = new URLSearchParams(window.location.search);
        // urlParams.set('pgnum', 9);
        // console.log(urlParams.toString());

    //////////////////////////////////////////////////
    //prefil search -php ahndles some of it already but looks like crap. js better
    //////////////////////////////////////////////////
    {
        let _urlParams  = new URLSearchParams(window.location.search);

        if(_urlParams.has("batchsize")) _selSelected(srch_batchSize.querySelectorAll("option")  , _urlParams.get('batchsize'));
        if(_urlParams.has("cmpari"))    _selSelected(srch_cmpAgainst.querySelectorAll("option") , _urlParams.get('cmpari'));
        if(_urlParams.has("orderBy"))   _selSelected(srch_ordBy.querySelectorAll("option")      , _urlParams.get('orderBy'));
        
        function _selSelected(eleArr, srchVal){
            eleArr.forEach((v)=>{
                if(v.getAttribute('value') == srchVal)  v.setAttribute("selected","");
                else    v.removeAttribute('selected');
            });
        }
    }

    //////////////////////////////////////////////////
    //search request
    //////////////////////////////////////////////////
    /*
    form_srch.onsubmit = (v)=>{
        v.preventDefault();//maybe
        let fd = new FormData(form_srch);
            // fd.append('pgnum', 0);

        let xhr = new XMLHttpRequest();
        xhr.open("GET", '/request/chat/searchUsers.php', true);
        xhr.onload = ()=>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    usercard_container.innerHTML = '';
                    let curETime = Date.now()/1000;
                    data = JSON.parse(xhr.response);
                    for(const val of data.values()){
                        crd = usercard_templet.cloneNode(true);
                        
                        crd.querySelector(".card-title").innerText = val['username'];

                        let d = new Date(0);
                        d.setSeconds(val['creationtime']);
                        crd.querySelector("small.text-left").innerText = d.toLocaleDateString() + " | ";

                        crd.querySelector("small.text-right").innerText = (
                            (lat = val['lastactivetime']) <= 0   ? 'online'
                                :   ((curETime - lat)/(36e2)).toFixed(1) + "hr ago"
                        );
                        
                        crd.querySelector(".card-text").innerText = val['description'];
                        
                        usercard_container.appendChild(crd);
                    }
                }
            }
        };
        xhr.send(fd);
    }
    */
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", '/request/chat/searchUsers.php' + window.location.search, true);
    xhr.onload = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                // console.log('params:\n' + window.location.search);
                // console.log('res:\n' + xhr.response);
                let curETime    = Date.now()/1000,
                    data        = JSON.parse(xhr.response)
                    ;
                window.localStorage.setItem('resultCount', data.length);

                for(const val of data.values()){
                    let crd = usercard_template.cloneNode(true);
                    
                    crd.querySelector(".card-title").innerText = val['username'];

                    let d = new Date(0);
                    d.setSeconds(val['creationtime']);
                    crd.querySelector("small.text-left").innerText = d.toLocaleDateString() + " | ";

                    crd.querySelector("small.text-right").innerText = (
                        (lat = val['lastactivetime']) <= 0   ? 'online'
                            :   ((curETime - lat)/(36e2)).toFixed(1) + "hr ago"
                    );
                    
                    crd.querySelector(".card-text").innerText = val['description'];
                    
                    usercard_container.appendChild(crd);
                }
            }
        }
    };
    xhr.send(null);

    //////////////////////////////////////////////////
    //page number handling
    //////////////////////////////////////////////////
    xhr.addEventListener('load', ()=> {
        let _numprior   = 3,
            _numnext    = 0,
            _urlParams  = new URLSearchParams(window.location.search),
            _pgnum      = _urlParams.has('pgnum') ? parseInt(_urlParams.get('pgnum')) : 0,
            _liPrevious = pginatBottom_ul.querySelector(".previous"),
            _liNext     = pginatBottom_ul.querySelector(".next")
            _eff_batchSize  = (_urlParams.has('batchsize') ? _urlParams.get('batchsize') : srch_batchSize.value);
        ;

        // console.log(window.localStorage.getItem('resultCount'));
        // console.log(_eff_batchSize);

        if(_pgnum <= 0) _liPrevious.classList.add('disabled');
        else{
            _liPrevious.querySelector("a").setAttribute('href', _setGetPgNumLink(_urlParams, _pgnum-1));
            let ele = _liPrevious.cloneNode(true);
            let a = ele.querySelector("a");
                a.setAttribute('href', _setGetPgNumLink(_urlParams, 0));
                a.innerText = 'First';

            _liPrevious.insertAdjacentElement('beforebegin', ele);
        }

        if(_urlParams.has('batchsize') ? 
                (_eff_batchSize == 'all' ? 
                    true 
                :  
                    window.localStorage.getItem('resultCount') < _eff_batchSize)
            : 
                false)
            _liNext.classList.add('disabled');
        else    _liNext.querySelector("a").setAttribute('href', _setGetPgNumLink(_urlParams, _pgnum+1));

        for(i = (_pgnum-_numprior) < 0 ? 0 : (_pgnum-_numprior); i < _pgnum; i++){
            _insert_lnkTemplate(i,_liNext,pginat_lknTemplate);
        }
        // if((_urlParams.has('batchsize') && (bch = _urlParams.get('batchsize')) != 'all') ? )
        for(i = _pgnum+1; i <= _pgnum+_numnext; i++){
            _insert_lnkTemplate(i,_liNext,pginat_lknTemplate);
        }

        function _insert_lnkTemplate(i, apdTo, template){
            let ele = template.cloneNode(true);

            let a = ele.querySelector("a.page-link");
                a.setAttribute("href", _setGetPgNumLink(_urlParams, i));
                a.innerText = i;
            
            apdTo.insertAdjacentElement('beforebegin', ele);
        }

        function _setGetPgNumLink(params, num){
            params.set('pgnum', num);
            return window.location.pathname + '?' + params.toString();
        }
    });

    /* 
        <ul class="pagination justify-content-center" id="paginationBottom-ui">
            <template> <li class="page-item"><a class="page-link">1</a></li> </template>
            <li class="page-item previous"><a class="page-link" href="#" tabindex="-1">Previous</a></li>
            <li class="page-item next"><a class="page-link" href="#">Next</a></li>
        </ul>
    */


    //////////////////////////////////////////////////
    //try new name
    //////////////////////////////////////////////////
    form_tryUsername.addEventListener("submit", (v)=>{
        v.preventDefault();

        let formdata = new FormData(form_tryUsername);
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/request/chat/tryname.php", true);
        xhr.onload = ()=>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    let res = xhr.response;
                    if((/success/).test(res)){
                        form_tryUsername.querySelector("input[name='newName']").value = '';
                        document.getElementById('modal-user-usernamedisplay').innerText = res.substring(res.indexOf(' ') + 1);
                    }else if((/fail/).test(res)){
                        alert(res);
                    }
                }
            }
        };
        xhr.send(formdata);
    });

    //////////////////////////////////////////////////
    //set description
    //////////////////////////////////////////////////
    decpt_btn.setAttribute("hidden","");
    if (decpt_txt.addEventListener) {
        decpt_txt.addEventListener('input', function() {
            decpt_btn.removeAttribute("hidden");
        }, false);
    } else if (area.attachEvent) {
        decpt_txt.attachEvent('onpropertychange', function() {
            decpt_btn.removeAttribute("hidden");
        });
    }

    form_decpt.addEventListener("submit", ()=>{
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/request/chat/setUsrDescription.php", true);
        xhr.onload = ()=>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    nameDisplay.innerText = xhr.response;
                }
            }
            rndName_btn.innerHTML = "random name";
            rndName_btn.removeAttribute("disabled");
        };

        let formdata = new FormData();
        formdata.append('usepreexisting', 0);
        xhr.send(formdata);
    });

    //////////////////////////////////////////////////
    //random name button
    //////////////////////////////////////////////////
    rndName_btn.addEventListener("click",()=>{
        rndName_btn.setAttribute("disabled","");
        rndName_btn.innerHTML = '<div class="spinner-border text-warning" role="status"><span class="sr-only">Loading...</span></div>';
        
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/request/chat/genSetName.php", true);
        xhr.onload = ()=>{
            if(xhr.readyState === XMLHttpRequest.DONE){
                if(xhr.status === 200){
                    // console.log("response: " + xhr.response);
                    nameDisplay.innerText = xhr.response;
                }
            }
            rndName_btn.innerHTML = "random name";
            rndName_btn.removeAttribute("disabled");
        };

        let formdata = new FormData();
        formdata.append('usepreexisting', 0);
        xhr.send(formdata);
    });

});