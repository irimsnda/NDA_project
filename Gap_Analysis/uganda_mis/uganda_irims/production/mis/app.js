/*
 * This file is responsible for launching the application. Application logic should be
 * placed in the Admin.Application class.
 */
var timeoutInMiliseconds = 800000;
    funcusersignout = false;
	var timeoutId; 
Ext.application({
    name: 'Admin',

    extend: 'Admin.Application',

    // Simply require all classes in the application. This is sufficient to ensure
    // that all Admin classes will be included in the application build. If classes
    // have specific requirements on each other, you may need to still require them
    // explicitly.
    //
    requires: [
        'Admin.*',
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Cartesian',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.series.Bar'
    ]
    
});
//

Ext.apply(Ext.form.VTypes, {
    password: function (val, field) {
        if (field.initialPassField) {
            var pwd = Ext.getCmp(field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },
    passwordText: 'Passwords do not match!'
});
//check idel scree session 
function startTimer() { 
    // window.setTimeout returns an Id that can be used to start and stop a timer
    
    timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds);
    
}
  
function doInactive() {
    //alert();
   var reLoginWin = Ext.widget('lockscreen'),
        me = this;
    //reLoginWin.show();
    onLogoutClick();
    // does whatever you need it to actually do - probably signs them out or stops polling the server for info
}
window.onbeforeunload = function (evt) {
    var message = 'Are you sure you want to leave?';
    if (typeof evt == 'undefined') {
     // evt = window.event;
    }
    if (evt) {
     // evt.returnValue = message;
    }
    if(funcusersignout){
        onLogoutClick() ;
        console.log("reloaded with expired session");
    }
    else{
        console.log("reloaded with active user");
    }
   //return message;
  }
function onLogoutClick(){

    //logout user from MIS
    var message = 'Are you sure you want to leave?';
   
    var form = Ext.create('Ext.form.Panel', {}),
        frm = form.getForm();
    
    frm.submit({
        url: 'logout',
        headers: {
            'X-CSRF-Token': token
        },
        waitMsg: 'Logging out, Please wait...',
        success: function (fm, action) {
            setTimeout(function () {
                location.reload();
            }, 100);
        },
        failure: function (fm, action) {
            var resp = action.result;
            toastr.error(resp.message, 'Failure Response');
        }
    });
}
function setupTimers () {
    document.addEventListener("mousemove", resetTimer, false);
    document.addEventListener("mousedown", resetTimer, false);
    document.addEventListener("keypress", resetTimer, false);
    document.addEventListener("touchmove", resetTimer, false);
     
    startTimer();
}
function resetTimer() { 
    window.clearTimeout(timeoutId)
    startTimer();
}
 
function checkApplicationChecklistDetails(application_code, module_id, sub_module_id,section_id,checklist_category_id,workflow_stage_id,process_id) {
    var hasValidatedChecklist = 0;
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/checkApplicationChecklistDetails',
        params: {
            application_code: application_code,
            sub_module_id: sub_module_id,
            checklist_category_id: checklist_category_id,
            module_id: module_id,
            section_id: section_id,
            workflow_stage:workflow_stage_id,
            process_id:process_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                hasValidatedChecklist = resp.hasValidatedChecklist;
            }
        }
    });
    return hasValidatedChecklist;
}


function checkUserSessionValidity(mins) {
    var runner = new Ext.util.TaskRunner(),
        task,
        reLoginWin = Ext.widget('lockscreen'),
        me = this,
        intraystore = Ext.getStore('intraystr'),
        onlinedashboardstr = Ext.getStore('onlineapplicationdashboardgridstr');
    task = runner.newTask({
        run: function () {
            intraystore.load();
            onlinedashboardstr.load();
            Ext.Ajax.request({
                url: 'authenticateUserSession',
                scope: this,
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText);
                    if (resp.success == false || resp.success === false) {
                        //reLoginWin.show();
                        onLogoutClick();
                        task.stop();
                        funcusersignout = true;
                    }
                },
                failure: function (response) {
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        },
        interval: mins
    });
    task.start();
}
function validateHasInvoiceGeneration(application_code,sub_module_id=0) {
    var hasInvoice = 0;
    
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/checkIfHasGeneratedInvoiceDEtails',
        params: {
            application_code: application_code,
            sub_module_id: sub_module_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                hasInvoice = 1;
            }
        }
    });
    return hasInvoice;
}
function validateHasImportExportProductDetils(application_code) {
    var hasProducts = 0;
    
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/validateHasImportExportProductDetils',
        params: {
            application_code: application_code,
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                hasProducts = 1;
            }
        }
    });
    return hasProducts;
}
function convert_object(obj) {
	var str = '';
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			str += '&' + p + '=' + obj[p];
		}
	}
	return str;
}
function convert_objectToparams(obj) {
	var str = '';
	for (var p in obj) {
		if (obj.hasOwnProperty(p)) {
			str += +p + ':' + obj[p] + ',';
		}
	}

	return str;
}
function print_report(url) {
    
    //win.body.unmask();
    var win = Ext.create('Ext.window.Window', {
        title: 'Preview Dialog',
        modal: true,
        minimizable: true,
        width: 1000,
        height: 650,
        frame: true,
        items: [{
            xtype: 'component',
            autoEl: {
                tag: 'iframe',
                style: 'height: 100%; width: 100%; overflow-x: auto;',
                src: url
            },
            listeners: {
                load: {
                    element: 'el',
                    fn: function () {
                        win.body.unmask();
                    }
                },
                render: function () {

                   // this.up('window').body.mask('Loading...');
                }
            }
        }]
    });
    win.show();
}

function download_report(url) {
    
   // win.body.unmask();
    var win = Ext.create('Ext.window.Window', {
        title: 'Download/Export Dialog',
        modal: true,
        width: 350,
        height: 250,
        frame: true,
        //closable: false,
        items: [{
            xtype: 'component',
            autoEl: {
                tag: 'iframe',
                style: 'height: 100%; width: 100%; background-image: ',
                src: url
            }, listeners: {
                load: {
                    element: 'el',
                    fn: function () {
                        win.body.unmask();
                        Ext.getBody().unmask();
                    }
                },
                render: function () {
                   // this.up('window').body.mask('Loading...');
                }
            }
        }]

    });
    win.show();
    Ext.Function.defer(function () {
        win.close();
    }, 20000);
}

function renderGridImage(val) {
    return '<img src="' + val + '">';
}

function funcShowFixedWindow(title, childObject, winXtype) {
    var view = Ext.apply({
        xtype: winXtype,
        title: title,height: '70%',
        autoScroll: true,
        items: [
            Ext.apply(
                childObject
            )
        ]
    });
    Ext.create(view);
}

function funcShowCustomizableWindow(title, width, childObject, winXtype) {
    var view = Ext.apply({
        xtype: winXtype,
        title: title,
        bodyPadding: 3,
        height: '60%',
        width: width,
        autoScroll: true,
        items: [
            Ext.apply(
                childObject
            )
        ]
    });
    Ext.create(view);
}


function funcShowCustomizableWindowWithObject(title, width, childObject, winXtype, object_1) {
    var view = Ext.apply({
        xtype: winXtype,
        object_1: object_1,
        title: title,
        bodyPadding: 3, autoScroll: true,
        width: width,
        items: [
            Ext.apply(
                childObject
            )
        ]
    });
    Ext.create(view);
}

function applyReadOnlytoForms(form_name) { //setDisabled

    Ext.Array.forEach(form_name.query('checkbox'), function (field) {
        field.setReadOnly(true);
    });
    Ext.Array.forEach(form_name.query('textfield'), function (field) {
        field.setReadOnly(true);
    });
    Ext.Array.forEach(form_name.query('datefield'), function (field) {
        field.setReadOnly(true);
    });
    Ext.Array.forEach(form_name.query('textareafield'), function (field) {
        field.setReadOnly(true);
    });
    Ext.Array.forEach(form_name.query('combobox'), function (field) {
        field.setReadOnly(true);
    });

    Ext.Array.forEach(form_name.query('textarea'), function (field) {
        field.setReadOnly(true);
    });
    Ext.Array.forEach(form_name.query('tagfield'), function (field) {
        field.setReadOnly(true);
    });
    Ext.Array.forEach(form_name.query('numberfield'), function (field) {
        field.setReadOnly(true);
    });
    Ext.Array.forEach(form_name.query('radiogroup'), function (field) {
        field.setReadOnly(true);
    });
}


function getBasicWorkflowDetails(module_id, section_id, sub_module_id) {
    var results = [];
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'workflow/getBasicWorkflowDetails',
        params: {
            module_id: module_id,
            section_id: section_id,
            sub_module_id: sub_module_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                results = resp.results;
            }
        }
    });
    return results;
}

function getInitialWorkflowDetails(module_id, section_id, sub_module_id,is_dataammendment_request=null) {
    var results = [];
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'workflow/getInitialWorkflowDetails',
        params: {
            module_id: module_id,
            section_id: section_id,
            sub_module_id: sub_module_id,
            is_dataammendment_request:is_dataammendment_request
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                results = resp.results;
            }
        }
    });
    return results;
}

function getInitialWorkflowDetailsNoProcess(module_id, sub_module_id) {
    var results = [];
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'workflow/getInitialWorkflowDetailsNoProcess',
        params: {
            module_id: module_id,
            sub_module_id:sub_module_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                results = resp.results;
            }
        }
    });
    return results;
}

function getAllWorkflowDetails(process_id, current_workflow_stage) {
    var results = [];
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'workflow/getAllWorkflowDetails',
        params: {
            process_id: process_id,
            workflow_stage: current_workflow_stage
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                results = resp.results;
            }
        }
    });
    return results;
}
//the details 
function showWorkflowSubmissionRevenueWin( application_code, workflow_stage_id, form_xtype, win_width, extraParams) {
    var form = Ext.widget(form_xtype);
    form.down('hiddenfield[name=application_code]').setValue(application_code);
    //form.setApplicationSelectionMode(applicationSelectionMode);
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'workflow/getRevenueApplicationSubmissionDetails',
        params: {
            workflow_stage_id: workflow_stage_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            Ext.getBody().unmask();
            var resp = Ext.JSON.decode(response.responseText),
                message = resp.message,
                success = resp.success;
            if (success || success == true || success === true) {
                var results = resp.results,
                    tracking_no = results.tracking_no,
                    ref_no = results.reference_no,
                    title = ref_no;
                if (!ref_no) {
                    title = tracking_no;
                }
                form.down('hiddenfield[name=curr_stage_id]').setValue(results.currentStageId);
                form.down('textfield[name=current_stage_name]').setValue(results.currentStageName);
                
                if (extraParams) {

                    Ext.each(extraParams, function (extraParam) {
                        if (form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']')) {
                            form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']').setValue(extraParam.value);
                        }
                    });
                }
                
                funcShowCustomizableWindow(title + ' - Submission', win_width, form, 'customizablewindow');
            } else {
                toastr.error(message, 'Failure Response');
            }
        },
        failure: function (fm, action) {
            Ext.getBody().unmask();
            var response = Ext.decode(action.response.responseText),
                message = response.message;
            toastr.error(message, 'Failure Response');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Ext.getBody().unmask();
            toastr.error('Error: ' + errorThrown, 'Error Response');
        }
    });
}
         
function showWorkflowSubmissionWin(application_id, application_code, table_name, form_xtype, win_width, storeID, extraParams, gridXtype, applicationSelectionMode,workflow_stage_id,is_dataammendment_request,stage_status=null
    ) {
  //  alert(workflow_stage_id);
    var form = Ext.widget(form_xtype);
    form.down('hiddenfield[name=application_id]').setValue(application_id);
    form.down('hiddenfield[name=application_code]').setValue(application_code);
    form.down('hiddenfield[name=is_dataammendment_request]').setValue(is_dataammendment_request);
    form.down('hiddenfield[name=table_name]').setValue(table_name);

    form.down('button[name=app_submission_btn]').storeID = storeID;
    form.down('button[name=app_submission_btn]').gridXtype = gridXtype;
    
    form.setApplicationSelectionMode(applicationSelectionMode);
    
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'workflow/getApplicationSubmissionDetails',
        params: {
            application_id: application_id,
            workflow_stage_id:workflow_stage_id,
            application_code:application_code,
            is_dataammendment_request:is_dataammendment_request,
            stage_status:stage_status,
            table_name: table_name
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            Ext.getBody().unmask();
            var resp = Ext.JSON.decode(response.responseText),
                message = resp.message,
                success = resp.success;
            if (success || success == true || success === true) {
                var results = resp.results,
                    tracking_no = results.tracking_no,
                    ref_no = results.reference_no,
                    title = ref_no;
                if (!ref_no) {
                    title = tracking_no;
                }
                form.down('hiddenfield[name=process_id]').setValue(results.processId);
                //added
                form.down('hiddenfield[name=module_id]').setValue(results.module_id);
                form.down('hiddenfield[name=sub_module_id]').setValue(results.sub_module_id);
                form.down('hiddenfield[name=section_id]').setValue(results.section_id);
                //added
                form.down('textfield[name=process_name]').setValue(results.processName);
                form.down('hiddenfield[name=curr_stage_id]').setValue(results.currentStageId);
                form.down('textfield[name=current_stage_name]').setValue(results.currentStageName);
                form.down('hiddenfield[name=application_status_id]').setValue(results.applicationStatusId);
                form.down('textfield[name=application_status]').setValue(results.applicationStatus);
                
                
                if(results.is_manager_submission == 1){
                    form.down('datefield[name=expected_start_date]').setVisible(true);
                    form.down('datefield[name=expected_end_date]').setVisible(true);
  form.down('hiddenfield[name=is_manager_submission]').setValue(results.is_manager_submission);

                }
                
                
                if (extraParams) {
                    Ext.each(extraParams, function (extraParam) {
                        if (form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']')) {
                            form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']').setValue(extraParam.value);
                        }
                    });
                }
                funcShowCustomizableWindow(title + ' - Submission', win_width, form, 'customizablewindow');
            } else {
                toastr.error(message, 'Failure Response');
            }
        },
        failure: function (fm, action) {
            Ext.getBody().unmask();
            var response = Ext.decode(action.response.responseText),
                message = response.message;
            toastr.error(message, 'Failure Response');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Ext.getBody().unmask();
            toastr.error('Error: ' + errorThrown, 'Error Response');
        }
    });
}

function showInspectionsWorkflowSubmissionWin(application_id, application_code, table_name, form_xtype, win_width, storeID, inspection_id, lead_inspector_id) {
    var form = Ext.widget(form_xtype);
    form.down('hiddenfield[name=application_id]').setValue(application_id);
    form.down('hiddenfield[name=application_code]').setValue(application_code);
    form.down('hiddenfield[name=table_name]').setValue(table_name);
    form.down('hiddenfield[name=inspection_id]').setValue(inspection_id);
    form.down('button[name=app_submission_btn]').storeID = storeID;
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'workflow/getApplicationSubmissionDetails',
        params: {
            application_id: application_id,
            table_name: table_name
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            Ext.getBody().unmask();
            var resp = Ext.JSON.decode(response.responseText),
                message = resp.message,
                success = resp.success;
            if (success || success == true || success === true) {
                var results = resp.results,
                    tracking_no = results.tracking_no,
                    ref_no = results.reference_no,
                    title = ref_no;
                if (!ref_no) {
                    title = tracking_no;
                }
                form.down('hiddenfield[name=process_id]').setValue(results.processId);
                //added
                form.down('hiddenfield[name=module_id]').setValue(results.module_id);
                form.down('hiddenfield[name=sub_module_id]').setValue(results.sub_module_id);
                form.down('hiddenfield[name=section_id]').setValue(results.section_id);
                //added
                form.down('textfield[name=process_name]').setValue(results.processName);
                form.down('hiddenfield[name=curr_stage_id]').setValue(results.currentStageId);
                form.down('textfield[name=current_stage_name]').setValue(results.currentStageName);
                form.down('hiddenfield[name=application_status_id]').setValue(results.applicationStatusId);
                form.down('textfield[name=application_status]').setValue(results.applicationStatus);
                form.down('combo[name=responsible_user]').setValue(lead_inspector_id);
                funcShowCustomizableWindow(title + ' - Submission', win_width, form, 'customizablewindow');
            } else {
                toastr.error(message, 'Failure Response');
            }
        },
        failure: function (fm, action) {
            Ext.getBody().unmask();
            var response = Ext.decode(action.response.responseText),
                message = response.message;
            toastr.error(message, 'Failure Response');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Ext.getBody().unmask();
            toastr.error('Error: ' + errorThrown, 'Error Response');
        }
    });
}

function showRecommendationWorkflowSubmissionWin(application_id, application_code, table_name, form_xtype, win_width, storeID, recommendation_type, extraParams,workflow_stage_id) {
    var form = Ext.widget(form_xtype),
        recommendation_fld = form.down('combo[name=recommendation_id]'),
        recommendation_store = recommendation_fld.getStore();
    form.down('hiddenfield[name=application_id]').setValue(application_id);
    form.down('hiddenfield[name=application_code]').setValue(application_code);
    form.down('hiddenfield[name=table_name]').setValue(table_name);
    form.down('button[name=app_submission_btn]').storeID = storeID;
    recommendation_store.removeAll();
    recommendation_store.load({params: {recommendation_type: recommendation_type}});
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'workflow/getApplicationSubmissionDetails',
        params: {
            application_id: application_id,
            workflow_stage_id:workflow_stage_id,
            table_name: table_name
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            Ext.getBody().unmask();
            var resp = Ext.JSON.decode(response.responseText),
                message = resp.message,
                success = resp.success;
            if (success || success == true || success === true) {
                var results = resp.results,
                    tracking_no = results.tracking_no,
                    ref_no = results.reference_no,
                    title = ref_no;
                if (!ref_no) {
                    title = tracking_no;
                }
                form.down('hiddenfield[name=process_id]').setValue(results.processId);
                //added
                form.down('hiddenfield[name=module_id]').setValue(results.module_id);
                form.down('hiddenfield[name=sub_module_id]').setValue(results.sub_module_id);
                form.down('hiddenfield[name=section_id]').setValue(results.section_id);
                //added
                form.down('textfield[name=process_name]').setValue(results.processName);
                form.down('hiddenfield[name=curr_stage_id]').setValue(results.currentStageId);
                form.down('textfield[name=current_stage_name]').setValue(results.currentStageName);
                form.down('textfield[name=application_status]').setValue(results.applicationStatus);
                if (extraParams) {
                    Ext.each(extraParams, function (extraParam) {
                        if (form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']')) {
                            form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']').setValue(extraParam.value);
                        }
                    });
                }
                funcShowCustomizableWindow(title + ' - Submission', win_width, form, 'customizablewindow');
            } else {
                toastr.error(message, 'Failure Response');
            }
        },
        failure: function (fm, action) {
            Ext.getBody().unmask();
            var response = Ext.decode(action.response.responseText),
                message = response.message;
            toastr.error(message, 'Failure Response');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Ext.getBody().unmask();
            toastr.error('Error: ' + errorThrown, 'Error Response');
        }
    });
}

function showreceiveAndInvoiceOnlineApplicationDetails(application_id, application_code, module_id, sub_module_id, section_id, form_xtype, win_width, storeID, tracking_no, status_type_id, extraParams, hasQueries) {
    var form = Ext.widget(form_xtype);
    
    form.down('hiddenfield[name=application_id]').setValue(application_id);
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'revenuemanagement/getApplicationInvoiceDetails',
        params: {
            module_id: module_id,
            sub_module_id: sub_module_id,
            section_id: section_id,
            status_type_id: status_type_id,
            has_queries: hasQueries,
            application_code: application_code
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {

            Ext.getBody().unmask();
            var resp = Ext.JSON.decode(response.responseText),
                message = resp.message,
                success = resp.success;
            if (success || success == true || success === true) {
                var results = resp.results;
                if (!results || results.length < 1) {
                    Ext.getBody().unmask();
                    toastr.warning('Problem encountered while fetching Application Invoice details-->Possibly Invoice Configuration not set!!', 'Warning Response');
                    return false;
                }
                form.down('hiddenfield[name=process_id]').setValue(results.processId);
                //added
                form.down('hiddenfield[name=module_id]').setValue(module_id);
                form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
                form.down('hiddenfield[name=section_id]').setValue(section_id);

                form.down('hiddenfield[name=curr_stage_id]').setValue(results.results);
                
                if (extraParams) {
                    Ext.each(extraParams, function (extraParam) {
                        if (form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']')) {
                            form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']').setValue(extraParam.value);
                        }
                    });
                }
                model = Ext.create('Ext.data.Model', results);

                form.loadRecord(model);
                funcShowCustomizableWindow(' - Invoice Details for'+tracking_no, win_width, form, 'customizablewindow');
            } else {
                toastr.error(message, 'Failure Response');
            }
        },
        failure: function (fm, action) {
            Ext.getBody().unmask();
            var response = Ext.decode(action.response.responseText),
                message = response.message;
            toastr.error(message, 'Failure Response');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Ext.getBody().unmask();
            toastr.error('Error: ' + errorThrown, 'Error Response');
        }
    });
}
function pass_complexcheck(p){
    var anUpperCase = /[A-Z]/;
    var aLowerCase = /[a-z]/;
    var aNumber = /[0-9]/;
    var aSpecial = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

        var numUpper = 0;
    var numLower = 0;
    var numNums = 0;
    var numSpecials = 0;

    for(var i=0; i<p.length; i++){
        if(anUpperCase.test(p[i]))
            numUpper++;
        else if(aLowerCase.test(p[i]))
            numLower++;
        else if(aNumber.test(p[i]))
            numNums++;
        else if(aSpecial.test(p[i]))
            numSpecials++;
    }
    var error_message = '',
        response = true,
        response_obj = {};
    if(p.length < 8){
        response = false
        error_message +="<br>Password Less than 8 Characters";
    }

    if(numUpper ==0){
        response = false
         error_message += "<br>Atleast one Upper case character";
    }
    if(numLower ==0){response = false
         error_message += "<br>Atleast one Lower case character";
    }
    if(numNums ==0){
        response = false
        error_message += "<br>Atleast one Numeric Value";
   }
   if(numSpecials ==0){
    response = false
        error_message += "<br>Atleast 1 Special Character";
    }
    response_obj = {
        error_message:error_message,
        response:response
    }
    return response_obj;
}
function showOnlineSubmissionWin(application_id, application_code, module_id, sub_module_id, section_id, form_xtype, win_width, storeID, tracking_no, status_type_id, extraParams, hasQueries, gridXtype,is_multi_submission='') {
    var form = Ext.widget(form_xtype),
        nextStageCmbo = form.down('combo[name=next_stage]'),
        nextStageStore = nextStageCmbo.getStore();
    form.down('button[name=app_submission_btn]').storeID = storeID;
    form.down('hiddenfield[name=application_id]').setValue(application_id);
    form.down('button[name=app_submission_btn]').gridXtype = gridXtype;
    
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'workflow/getOnlineApplicationSubmissionDetails',
        params: {
            module_id: module_id,
            sub_module_id: sub_module_id,
            section_id: section_id,
            status_type_id: status_type_id,
            has_queries: hasQueries,
            is_multi_submission:is_multi_submission,
            application_code: application_code
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            Ext.getBody().unmask();
            var resp = Ext.JSON.decode(response.responseText),
                message = resp.message,
                success = resp.success;
            if (success || success == true || success === true) {
                var results = resp.results,                
                needs_responsible_user = results.needs_responsible_user;
                if (!results || results.length < 1) {
                    Ext.getBody().unmask();
                    toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
                    return false;
                }
                form.down('hiddenfield[name=process_id]').setValue(results.processId);
                //added
                form.down('hiddenfield[name=module_id]').setValue(results.module_id);
                form.down('hiddenfield[name=sub_module_id]').setValue(results.sub_module_id);
                form.down('hiddenfield[name=section_id]').setValue(results.section_id);
                //added
                form.down('textfield[name=process_name]').setValue(results.processName);
                form.down('hiddenfield[name=curr_stage_id]').setValue(results.currentStageId);
                if(needs_responsible_user == 2){
                    form.down('combo[name=responsible_user]').setValue('');
                    form.down('combo[name=responsible_user]').setVisible(false);
                }
                if (extraParams) {
                    Ext.each(extraParams, function (extraParam) {
                        if (form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']')) {
                            form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']').setValue(extraParam.value);
                        }
                    });
                }
            
                nextStageCmbo.setValue(results.currentStageId);
                nextStageStore.removeAll();
                nextStageStore.load({params: {process_id: results.processId}});
                //check if has multi submissions
                if(results.has_premises_validation ==1){
                    premisesvalidation_assignmentcbo = form.down('combo[name=premisesvalidation_assignment_id]');
                    premisesvalidation_assignmentcbo.setVisible(true);
                    form.down('combo[name=premisesvalidation_respuser_id]').setVisible(true);
                    premisesvalidation_assignmentcbo.setValue(results.multinextstage_id);

                }

                funcShowCustomizableWindow(tracking_no + ' - Submission', win_width, form, 'customizablewindow');
            } else {
                toastr.error(message, 'Failure Response');
            }
        },
        failure: function (fm, action) {
            Ext.getBody().unmask();
            var response = Ext.decode(action.response.responseText),
                message = response.message;
            toastr.error(message, 'Failure Response');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Ext.getBody().unmask();
            toastr.error('Error: ' + errorThrown, 'Error Response');
        }
    });
}

function showOnlineRevenueRequestsSubmissionWin( module_id, form_xtype, winWidth, extraParams) {
    var form = Ext.widget(form_xtype),
        nextStageCmbo = form.down('combo[name=next_stage]'),
        nextStageStore = nextStageCmbo.getStore();
    form.down('button[name=app_submission_btn]').storeID = storeID;
    form.down('hiddenfield[name=application_id]').setValue(application_id);
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'workflow/getOnlineRevenueRequestsSubmissiondetails',
        params: {
            module_id: module_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            Ext.getBody().unmask();
            var resp = Ext.JSON.decode(response.responseText),
                message = resp.message,
                success = resp.success;
            if (success || success == true || success === true) {
                var results = resp.results;
                if (!results || results.length < 1) {
                    Ext.getBody().unmask();
                    toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
                    return false;
                }
                form.down('hiddenfield[name=process_id]').setValue(results.processId);
                //added
                form.down('hiddenfield[name=module_id]').setValue(results.module_id);
                form.down('hiddenfield[name=sub_module_id]').setValue(results.sub_module_id);
                form.down('hiddenfield[name=section_id]').setValue(results.section_id);
                //added
                form.down('textfield[name=process_name]').setValue(results.processName);
                form.down('hiddenfield[name=curr_stage_id]').setValue(results.currentStageId);
                if (extraParams) {
                    Ext.each(extraParams, function (extraParam) {
                        if (form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']')) {
                            form.down(extraParam.field_type + '[name=' + extraParam.field_name + ']').setValue(extraParam.value);
                        }
                    });
                }
                nextStageCmbo.setValue(results.currentStageId);
                nextStageStore.removeAll();
                nextStageStore.load({params: {process_id: results.processId}});
                funcShowCustomizableWindow(tracking_no + ' - Submission', win_width, form, 'customizablewindow');
            } else {
                toastr.error(message, 'Failure Response');
            }
        },
        failure: function (fm, action) {
            Ext.getBody().unmask();
            var response = Ext.decode(action.response.responseText),
                message = response.message;
            toastr.error(message, 'Failure Response');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Ext.getBody().unmask();
            toastr.error('Error: ' + errorThrown, 'Error Response');
        }
    });
}
function showPmsSamplesWorkflowSubmissionWin(application_id, application_code, table_name, form_xtype, win_width, storeID, analysis_type, recommendation_id, noTabClose, stage_id) {
    var form = Ext.widget(form_xtype);
    form.down('hiddenfield[name=application_id]').setValue(application_id);
    form.down('hiddenfield[name=application_code]').setValue(application_code);
    form.down('hiddenfield[name=table_name]').setValue(table_name);
    form.down('button[name=app_submission_btn]').storeID = storeID;
    form.down('button[name=app_submission_btn]').noTabClose = noTabClose;
    form.down('hiddenfield[name=recommendation_id]').setValue(recommendation_id);
    form.down('hiddenfield[name=analysis_type_id]').setValue(analysis_type);
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'workflow/getApplicationSubmissionDetailsFromSubmissionsTable',
        params: {
            application_id: application_id,
            application_code: application_code,
            current_stage_id: stage_id,
            table_name: table_name
        },
        
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            Ext.getBody().unmask();
            var resp = Ext.JSON.decode(response.responseText),
                message = resp.message,
                success = resp.success;
            if (success || success == true || success === true) {
                var results = resp.results,
                    tracking_no = results.tracking_no,
                    ref_no = results.reference_no,
                    title = ref_no;
                if (!ref_no) {
                    title = tracking_no;
                }
                form.down('hiddenfield[name=process_id]').setValue(results.processId);
                //added
                form.down('hiddenfield[name=module_id]').setValue(results.module_id);
                form.down('hiddenfield[name=sub_module_id]').setValue(results.sub_module_id);
                form.down('hiddenfield[name=section_id]').setValue(results.section_id);
                //added
                form.down('textfield[name=process_name]').setValue(results.processName);
                form.down('hiddenfield[name=curr_stage_id]').setValue(results.currentStageId);
                form.down('textfield[name=current_stage_name]').setValue(results.currentStageName);
                form.down('hiddenfield[name=application_status_id]').setValue(results.applicationStatusId);
                form.down('textfield[name=application_status]').setValue(results.applicationStatus);
                funcShowCustomizableWindow(title + ' - Submission', win_width, form, 'customizablewindow');
            } else {
                toastr.error(message, 'Failure Response');
            }
        },
        failure: function (fm, action) {
            Ext.getBody().unmask();
            var response = Ext.decode(action.response.responseText),
                message = response.message;
            toastr.error(message, 'Failure Response');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Ext.getBody().unmask();
            toastr.error('Error: ' + errorThrown, 'Error Response');
        }
    });
}

function getApplicationStore(module_id, section_id,sub_module_id) {
    var module_name,
        section_name,
        impexp_stores = {
            food: 'foodimportexportpermitsstr',
            drugs: 'drugsimportexportpermitsstr',
            cosmetics: 'cosmeticsimportexportpermitsstr',
            medicine: 'medicaldevimportexportpermitsstr'
        },
        product_stores = {
            food: 'foodproductregistrationstr',
            drugs: 'drugproductregistrationstr',
            cosmetics: 'cosmeticsproductregistrationstr',
            medicine: 'medicaldevicesproductregistrationstr'
        },
        premise_stores = {
            food: 'foodpremiseregistrationstr',
            drugs: 'drugspremiseregistrationstr',
            cosmetics: 'cosmeticspremiseregistrationstr',
            medicine: 'medicinepremiseregistrationstr'
        },premiseinspection_stores = {
            drugs: 'premisesinspectiondashgridstr',
            medicine: 'premisesinspectiondashgridstr'
        },
        gmp_stores = {
            food: 'foodgmpapplicationsstr',
            drugs: 'drugsgmpapplicationsstr',
            cosmetics: 'cosmeticsgmpapplicationsstr',
            medicine: 'meddevicesgmpapplicationsstr'
        },
        clinicalTrial_stores = {
            clinical_trial: 'clinicaltrialstr'
        },
        pharmacovigilanceapp_stores = {
            clinical_trial: 'pharmacovigilanceappstr'
        },
        pms_stores = {
            food: 'foodsurveillancestr',
            drugs: 'drugssurveillancestr',
            cosmetics: 'cosmeticssurveillancestr',
            medicine: 'meddevicessurveillancestr'
        },
        promotionmaterialapplicationstr = {
            food: 'promotionadvertsfoodapplicationstr',
            drugs: 'promotionmaterialapplicationstr',
            cosmetics: 'promotionadvertscosmeticapplicationstr',
            medicine: 'promotionadvertsmedicaldevicesapplicationsstr'
        },
        productnotificationapplicationstr = {
            medicine: 'medicaldevicenotificationdashstr'
        },disposalapplicationsdashgridstr = {
            medicine: 'disposalapplicationsdashgridstr',
            drugs: 'disposalapplicationsdashgridstr',
        },adhocapplicationsdashgridstr = {
               food: 'adhocinvoicingprocessdashgridstr',
            drugs: 'adhocinvoicingprocessdashgridstr',
            cosmetics: 'adhocinvoicingprocessdashgridstr',
            medicine: 'adhocinvoicingprocessdashgridstr'
        },
        application_stores = {
            product_stores: product_stores,
            premise_stores: premise_stores,
            premiseinspection_stores: premiseinspection_stores,
            gmp_stores: gmp_stores,
            clinicalTrial_stores: clinicalTrial_stores,
            pharmacovigilanceapp_stores: pharmacovigilanceapp_stores,
            pms_stores: pms_stores,
            impexp_stores: impexp_stores,
            promotionmaterialapplicationstr: promotionmaterialapplicationstr,
            productnotificationapplicationstr: productnotificationapplicationstr,
            disposalapplicationsdashgridstr:disposalapplicationsdashgridstr,
            adhocapplicationsdashgridstr:adhocapplicationsdashgridstr
        };
        console.log(section_id); console.log(module_id);
    //modules
    if (module_id == 1 || module_id === 1) {
        module_name = 'product_stores';
    } else if (module_id == 2 || module_id === 2) {
        if(sub_module_id == 50){
            module_name = 'premiseinspection_stores';
        }
        else{
            module_name = 'premise_stores';
        }
    } else if (module_id == 3 || module_id === 3) {
        module_name = 'gmp_stores';
    } else if (module_id == 7 || module_id === 7) {
        module_name = 'clinicalTrial_stores';
    } else if (module_id == 5 || module_id === 5) {
        module_name = 'pms_stores';
    } else if (module_id == 4 || module_id === 4 ) {
        module_name = 'impexp_stores';
    } else if (module_id == 14 || module_id === 14) {
        module_name = 'promotionmaterialapplicationstr';
    } else if (module_id == 6 || module_id === 6) {
        module_name = 'productnotificationapplicationstr';
    }  else if (module_id == 15 || module_id === 15) {
        module_name = 'disposalapplicationsdashgridstr';
    } else if (module_id == 17 || module_id === 17) {
        module_name = 'adhocapplicationsdashgridstr';
    } else if (module_id == 20 || module_id === 20) {
        module_name = 'impexp_stores';
    }else if (module_id == 12 || module_id === 12 ) {
        module_name = 'impexp_stores';
    } else if (module_id == 19 || module_id === 19 ) {
        module_name = 'sampleanalysisstr';
    } else if (module_id == 23 || module_id === 23 ) {
        module_name = 'pharmacovigilanceapp_stores';
    }else {
        //unknown module
    }
    //sections
    if (section_id == 1 || section_id === 1) {
        section_name = 'food';
    } else if (section_id == 2 || section_id === 2) {
        section_name = 'drugs';
    } else if (section_id == 3 || section_id === 3) {
        section_name = 'cosmetics';
    } else if (section_id == 4 || section_id === 4) {
        section_name = 'medicine';
    } else if (section_id == 5 || section_id === 5) {
        section_name = 'clinical_trial';
    } else {
        //unknown section
    }
    return application_stores[module_name][section_name];
}

function getApplicationTable(module_id, section_id) {
    var table_name,
        application_tables = {
            premise_table: 'tra_premises_applications',
            gmp_table: 'tra_gmp_applications',
            clinicalTrial_table: 'tra_clinical_trial_applications',
            product_table: 'tra_product_applications',
            pms_table: 'tra_surveillance_applications',
            importexport_table: 'tra_importexport_applications',
            tra_promotion_adverts_applications: 'tra_promotion_adverts_applications',
            product_notifications: 'tra_product_notifications',
            disposal: 'tra_disposal_applications',
            adhoc: 'tra_adhocinvoices_applications',
            pharmacovigilance: 'tra_pharmacovigilance_reporting'

        };
    table_name = '';
    //modules
    if (module_id == 1 || module_id === 1) {
        table_name = 'product_table';
    } else if (module_id == 2 || module_id === 2) {
        table_name = 'premise_table';
    } else if (module_id == 3 || module_id === 3) {
        table_name = 'gmp_table';
    } else if (module_id == 7 || module_id === 7) {
        table_name = 'clinicalTrial_table';
    } else if (module_id == 5 || module_id === 5) {
        table_name = 'pms_table';
    } else if (module_id == 4 || module_id === 4) {
        table_name = 'importexport_table';
    } else if (module_id == 14 || module_id === 14) {
        table_name = 'tra_promotion_adverts_applications';
    } else if (module_id == 6 || module_id === 6) {
        table_name = 'product_notifications';
    }else if (module_id == 15 || module_id === 15) {
        table_name = 'disposal';
    }else if (module_id == 17 || module_id === 17) {
        table_name = 'adhoc';
    }else if (module_id == 23 || module_id === 23) {
        table_name = 'pharmacovigilance';
    } else {
        //unknown module 
    }
    return application_tables[table_name];
}

function getPremiseRegModuleStaticStage(sub_module_id, section_id, target_stage) {
    var static_stage;
    if (sub_module_id == 1) {//New
        if (section_id == 1) {//Food
            if (target_stage == 'inspection') {
                static_stage = 17;//inspection
            } else if (target_stage == 'evaluation') {
                static_stage = 9;//evaluation
            }
        } else if (section_id == 2) {//Drugs
            if (target_stage == 'inspection') {
                static_stage = 24;//inspection
            } else if (target_stage == 'evaluation') {
                static_stage = 26;//evaluation
            }
        } else if (section_id == 3) {//Cosmetics
            if (target_stage == 'inspection') {
                static_stage = 35;//inspection
            } else if (target_stage == 'evaluation') {
                static_stage = 37;//evaluation
            }
        } else if (section_id == 4) {//Medical Devices
            if (target_stage == 'inspection') {
                static_stage = 47;//inspection
            } else if (target_stage == 'evaluation') {
                static_stage = 49;//evaluation
            }
        }
    } else if (sub_module_id == 2) {//Renewal
        if (section_id == 1) {//Food
            if (target_stage == 'inspection') {
                static_stage = 60;//inspection
            } else if (target_stage == 'evaluation') {
                static_stage = 62;//evaluation
            }
        } else if (section_id == 2) {//Drugs
            if (target_stage == 'inspection') {
                static_stage = 71;//inspection
            } else if (target_stage == 'evaluation') {
                static_stage = 73;//evaluation
            }
        } else if (section_id == 3) {//Cosmetics
            if (target_stage == 'inspection') {
                static_stage = 83;//inspection
            } else if (target_stage == 'evaluation') {
                static_stage = 85;//evaluation
            }
        } else if (section_id == 4) {//Medical Devices
            if (target_stage == 'inspection') {
                static_stage = 95;//inspection
            } else if (target_stage == 'evaluation') {
                static_stage = 97;//evaluation
            }
        }
    } else if (sub_module_id == 3) {//Alterations

    }
    return static_stage;
}

function getGmpModuleStaticStage(sub_module_id, section_id, target_stage) {
    var static_stage;
    if (sub_module_id == 5) {//New
        if (target_stage == 'smfuploads') {
            static_stage = 373;//SMF Uploads
        } else if (target_stage == 'inspection') {
            static_stage = 121;//Inspection
        } else if (target_stage == 'deskreviewrequireduploads') {
            static_stage = 380;//Desk review required Uploads
        } else if (target_stage == 'deskreviewprocess') {
            static_stage = 379;//Desk review process
        }
    } else if (sub_module_id == 6) {//Amendment

    } else if (sub_module_id == 39) {//Withdrawal

    } else if (sub_module_id == 40) {//Alteration
        if (target_stage == 'evaluation') {
            static_stage = 398;//Evaluation Uploads
        }
    }
    return static_stage;
}

function getClinicalTrialModuleStaticStage(sub_module_id, section_id, target_stage) {
    var static_stage;
    if (sub_module_id == 10) {//New
        if (target_stage == 'assessment') {
            static_stage = 150;//assessment
        } else if (target_stage == 'auditing') {
            static_stage = 151;//auditing
        }
    } else if (sub_module_id == 11) {//Amendment
        if (target_stage == 'assessment') {
            static_stage = 164;//assessment
        } else if (target_stage == 'auditing') {
            static_stage = 165;//auditing
        }
    }
    return static_stage;
}

function closeActiveWindow() {
    var activeWin = Ext.WindowManager.getActive();
    if (activeWin) {
        activeWin.close();
    }
}
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}


function checkApprovalREcommendationDEtails(application_code) {
    var hasReviewrecommendation = 0;
    
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/checkApprovalREcommendationDEtails',
        params: {
            application_code: application_code,
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                hasReviewrecommendation = 1;
            }
        }
    });
    return hasReviewrecommendation;
}

function validateDocumentsSubmissonRecRecommendation(application_code) {
    var hasReviewrecommendation = 0;
    
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/validateDocumentsSubmissonRecRecommendation',
        params: {
            application_code: application_code,
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                hasReviewrecommendation = 1;
            }
        }
    });
    return hasReviewrecommendation;
}

function checkReviewREcommendationDEtails(application_code) {
    var hasReviewrecommendation = 0;
    
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/checkReviewREcommendationDEtails',
        params: {
            application_code: application_code,
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                hasReviewrecommendation = 1;
            }
        }
    });
    return hasReviewrecommendation;
}

function checkSampleSubmisisonDetails(application_code) {
    var is_recommended = false;
    
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/checkSampleSubmisisonDetails',
        params: {
            application_code: application_code
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                is_recommended = true;
            }
        }
    });
    return is_recommended;
}
function checkPrecheckingrecommendation(application_code, module_id){
    is_recommended = true;
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/checkPrecheckingrecommendation',
        params: {
            application_code: application_code,
            module_id: module_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                is_recommended = true;
            }
            else{
               
                is_recommended = false;
                return false;
            }
        }
    });
    return is_recommended;
}
function checkApplicationEvaluationOverralRecom(application_code,comment_type_id){
    var hasRecommendation = 0;
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/checkApplicationEvaluationOverralRecom',
        params: {
            application_code: application_code,
            comment_type_id: comment_type_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                hasRecommendation = resp.hasRecommendation;
            }
        }
    });
    return hasRecommendation;

}
function checkApplicationRaisedQueries(application_code, module_id, query_type) {
    var hasQueries = 0;
    if (!query_type) {
        query_type = 1;
    }
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/checkApplicationRaisedQueries',
        params: {
            application_code: application_code,
            module_id: module_id,
            query_type: query_type
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                hasQueries = resp.hasQueries;
            }
        }
    });
    return hasQueries;
}
function validateHasUploadedDocumentsDetils(application_code, module_id, sub_module_id,section_id,checklist_category_id,workflow_stage_id,process_id=0) {
    var hasValidatedChecklist = 0;
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/validateHasUploadedDocumentsDetils',
        params: {
            application_code: application_code,
            sub_module_id: sub_module_id,
            checklist_category_id: checklist_category_id,
            module_id: module_id,
            section_id: section_id,
            workflow_stage:workflow_stage_id,
            process_id:process_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                hasValidatedChecklist = resp.hasValidatedChecklist;
            }
        }
    });
    return hasValidatedChecklist;
}
function checkOnlineApplicationChecklistDetails(application_code, module_id, sub_module_id,section_id,checklist_category_id) {
    var hasValidatedChecklist = 0;
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/checkOnlineApplicationChecklistDetails',
        params: {
            application_code: application_code,
            sub_module_id: sub_module_id,
            checklist_category_id: checklist_category_id,
            module_id: module_id,
            section_id: section_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                hasValidatedChecklist = resp.hasValidatedChecklist;
            }
        }
    });
    return hasValidatedChecklist;
}function checkApplicationChecklistUploadDetails(application_code, module_id, sub_module_id,section_id,checklist_category_id,workflow_stage_id) {
    var hasValidatedChecklist = 0;
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/checkApplicationChecklistUploadDetails',
        params: {
            application_code: application_code,
            sub_module_id: sub_module_id,
            checklist_category_id: checklist_category_id,
            module_id: module_id,
            section_id: section_id,workflow_stage:workflow_stage_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                hasValidatedChecklist = resp.hasValidatedChecklist;
            }
        }
    });
    return hasValidatedChecklist;
}


function checkGeneratedInvoiceDetails(application_code, module_id, sub_module_id,section_id) {
    var invoiceIsGenerated = 0;
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/checkGeneratedInvoiceDetails',
        params: {
            application_code: application_code,
            sub_module_id: sub_module_id,
            module_id: module_id,
            section_id: section_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                invoiceIsGenerated = resp.invoiceIsGenerated;
            }
        }
    });
    return invoiceIsGenerated;
}
function checkApplicationUnstructuredQueries(application_code, module_id) {
    var hasQueries = 0;
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/checkApplicationUnstructuredQueries',
        params: {
            application_code: application_code,
            module_id: module_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                hasQueries = resp.hasQueries;
            }
        }
    });
    return hasQueries;
}

function checkApplicationRespondedUnclosedQueries(application_code, module_id) {
    var hasQueries = 0;
    Ext.Ajax.request({
        method: 'GET',
        async: false,
        url: 'api/checkApplicationRespondedUnclosedQueries',
        params: {
            application_code: application_code,
            module_id: module_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
        success: function (response) {
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success;
            if (success || success == true || success === true) {
                hasQueries = resp.hasQueries;
            }
        }
    });
    return hasQueries;
}