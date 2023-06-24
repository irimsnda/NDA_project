<!DOCTYPE html>
<html lang="en">
<head lang="en">
    <meta charset="UTF-8">
    <title>Resumable File Upload</title>
    <link href="{{asset('public/file-upload/bower_components/bootstrap/dist/css/bootstrap.min.css')}}" rel="stylesheet">
    <link href="{{asset('public/file-upload/bower_components/Font-Awesome/css/all.min.css')}}" rel="stylesheet">

    <script type="text/javascript" src="{{asset('public/file-upload/bower_components/resumable.js/resumable.js')}}"></script>
    <script type="text/javascript" src="{{asset('public/file-upload/bower_components/jquery/dist/jquery.min.js')}}"></script>
    <script type="text/javascript"
            src="{{asset('public/file-upload/bower_components/bootstrap/dist/js/bootstrap.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('public/file-upload/bower_components/Font-Awesome/js/all.min.js')}}"></script>
</head>
<body>

<div class="container">

    <div class="row">
        <div class="col-lg-offset-2 col-lg-8">
                <h6> Resumable file upload
                </h6>
           
        </div>

        <div class="col-lg-offset-2 col-lg-8">
            <button type="button" class="btn btn-success" aria-label="Add file" id="add-file-btn">
                <i class="fa fa-plus" aria-hidden="true"></i> Add file
            </button>
           <!-- <button type="button" class="btn btn-info" aria-label="Start upload" id="start-upload-btn">
                <span class="fa fa-upload" aria-hidden="true"></span> Start upload
            </button>
			-->
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
            <div class="progress hide" id="upload-progress">
                <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"
                     style="width: 0%">
                    <span class="sr-only"></span>
                </div>
            </div>
			<div class="upload_progress hide" id="uploaded-progress">
			
			
			</div>
            </p>
        </div>
    </div>

</div>


<script>
     var r = new Resumable({
        target: 'uploadFile',
        testChunks: true,
        query: {'module_id': '<?php echo $module_id; ?>','sub_module_id': '<?php echo $sub_module_id; ?>', 'application_code': '<?php echo $application_code; ?>', 'document_requirement_id': '<?php echo $document_requirement_id; ?>', 'node_ref': '<?php echo $node_ref; ?>', 'id': '<?php echo $id; ?>'}
    });

    r.assignBrowse(document.getElementById('add-file-btn'));

    $('#start-upload-btn').click(function () {
        r.upload();
        $('#upload-progress').removeClass('file-upload');
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
	var upload_progressBar = new ProgressBar($('#uploaded-progress'));

    r.on('fileAdded', function (file, event) {
		r.upload();
        progressBar.fileAdded();
    });

    r.on('fileSuccess', function (file, message) {
        progressBar.finish();
			$('#uploaded-progress').addClass('file-uploaded').append("<h6 style='color:green !important;font-weight: bold;'>Upload Complete, refresh to load documents.</h6>");
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
            //$('#uploaded-progress').addClass('file-uploaded').append("<h6 style='color: !important;'>Reload the data grid, when document upload completes.</h6>");
            
        },

            this.uploading = function (progress) {
                (this.thisEle).find('.progress-bar').attr('style', "width:" + progress + '%');
               
            },

            this.finish = function () {
				
				
               (this.thisEle).addClass('hide').find('.progress-bar').css('width', '0%');
			    $('#uploaded-progress').find('file-uploaded').append("<p style='color:#000 !important;'>Document has been synchronised successfully, reload the data grid to confirm Upload.</p>");
				 $('#uploaded-progress').removeClass('file-uploaded');
            }
    }
</script>

</body>
</html>
