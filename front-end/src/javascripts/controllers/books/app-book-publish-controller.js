
import appBookPublish from '@views/router/app-book-publish.html'
import bookModel from '@models'
import angel from '@utils/angel'



let cover = ''
let editor = null
const render = (req, res, next) => {
    changeStyle()
    res.render(template.compile(appBookPublish)())
    initFlatpickr()
    bindEvents()
    
}

function changeStyle() {
    $('#publish').siblings().children('a').removeClass('active')
    $('#publish').children('a').addClass('active')
}

function initFlatpickr() {
    $("#bookPublishTime").flatpickr({
        allowInput: true
    });  
    $("#bookStorageDate").flatpickr({
        allowInput: true
    }); 
    editor = new Simditor({
        textarea: $('#bookAbstract'),
        imageButton: ['upload'],
        upload: {
            url: '/api/v1/file/description/img',
            fileKey: 'bookCover',
            leaveConfirm: '正在上传文件..'
        }
    });
}

function bindEvents() {
    // 发布电影讯息
    $('#publish-form').submit(async function(e){
        e.preventDefault()

        // 判断是否已经上传图片
        if ( !cover ) {
            $.Toast('Warning', '请上传图片', 'warning')
            return false
        }

        let name = $('#bookName').val()
        let abstract = editor.getValue()
        let author = $('#bookAuthor').val()
        let type = $('#bookType').val()
        let press = $('#bookPress').val()
        let storageDate = $('#bookStorageDate').val()
        let publishTime = $('#bookPublishTime').val()
        let totalNum = $('#bookTotalNum').val()
        let data = await bookModel.postBookItem({
            name, abstract, author, type, press, storageDate, publishTime, totalNum, cover
        })
        // 发布成功后回到列表
        if ( data ) {
            angel.emit('go', '/book/items')
        }
    })



    $('.img-btn').click(function() {
        $('#item-img').trigger('click')
    })
    $('#item-img').change(function(e) {
        uploadImage(this)
    })
}

function uploadImage (inp) {
    let formData = new FormData()
    // 第一个参数为上传的字段
    formData.append('bookCover', inp.files[0])
    $.ajax({
        url: '/api/v1/file/upload/img',
        type: 'post',
        data: formData,
        processData: false,
        contentType: false,
    }).done((res) => {
        if ( res.code === 501 ) {
            $.Toast('Warning', res.msg, 'warning')
            return false;
        }
        cover = 'http://10.60.18.149:3000' + res.data.img
        $('.publish-img-box').removeClass('hidden').find('img').attr('src', cover)
        $.Toast('Success', '图片上传成功', 'success')
    }).fail((error) => {
        $.Toast('Danger', '上传出错', 'error')
    })
}


export default {
    render
}