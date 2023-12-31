<!DOCTYPE html>
<html lang="en">
<head lang="en">
    <meta charset="UTF-8">
    <title>Resumable File Upload</title>
    <link href="{{asset('resources/bower_components/bootstrap/dist/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('resources/bower_components/Font-Awesome/css/all.min.css')}}" rel="stylesheet">

    <script type="text/javascript" src="{{asset('resources/bower_components/resumable.js/resumable.js')}}"></script>
    <script type="text/javascript" src="{{asset('resources/bower_components/jquery/dist/jquery.min.js')}}"></script>
    <script type="text/javascript"
            src="{{asset('resources/bower_components/bootstrap/dist/js/bootstrap.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('resources/bower_components/Font-Awesome/js/all.min.js')}}"></script>
</head>
<body>

<div class="container" style="padding-top: 100px;">

    <div class="row">
        <div class="col-lg-offset-2 col-lg-8">
            <div class="page-header">
                <h2> Resumable file upload
                    <small><br/>Please select file to upload anc click start upload</small>
                </h2>
            </div>
        </div>

        <div class="col-lg-offset-2 col-lg-8">
            <button type="button" class="btn btn-success" aria-label="Add file" id="add-file-btn">
                <i class="fa fa-plus" aria-hidden="true"></i> Add file
            </button>
            <button type="button" class="btn btn-info" aria-label="Start upload" id="start-upload-btn">
                <span class="fa fa-upload" aria-hidden="true"></span> Start upload
            </button>
            <button type="button" class="btn btn-warning" aria-label="Pause upload" id="pause-upload-btn">
                <span class="fa fa-pause " aria-hidden="true"></span> Pause upload
            </button>
        </div>


        <div class="col-lg-offset-2 col-lg-8">
            <p>
            <div class="progress hide" id="upload-progress">
                <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"
                     style="width: 0%">
                    <span class="sr-only"></span>
                </div>
            </div>
            </p>
        </div>
    </div>

</div>


<script>
    var r = new Resumable({
        target: 'uploadFile',
        testChunks: true,
        query: {'kip': 223}
    });

    r.assignBrowse(document.getElementById('add-file-btn'));

    $('#start-upload-btn').click(function () {
        r.upload();
    });

    $('#pause-upload-btn').click(function () {
        if (r.files.length > 0) {
            if (r.isUploading()) {
                return r.pause();
            }
            return r.upload();
        }
    });

    var progressBar = new ProgressBar($('#upload-progress'));

    r.on('fileAdded', function (file, event) {
        progressBar.fileAdded();
    });

    r.on('fileSuccess', function (file, message) {
        progressBar.finish();
    });

    r.on('progress', function () {
        progressBar.uploading(r.progress() * 100);
        $('#pause-upload-btn').find('.fa').removeClass('fa-play').addClass('fa-pause');
    });

    r.on('pause', function () {
        $('#pause-upload-btn').find('.fa').removeClass('fa-pause').addClass('fa-play');
    });

    function ProgressBar(ele) {
        this.thisEle = $(ele);

        this.fileAdded = function () {
            (this.thisEle).removeClass('hide').find('.progress-bar').css('width', '0%');
        },

            this.uploading = function (progress) {
                (this.thisEle).find('.progress-bar').attr('style', "width:" + progress + '%');
            },

            this.finish = function () {
                (this.thisEle).addClass('hide').find('.progress-bar').css('width', '0%');
            }
    }
</script>

</body>
</html>
