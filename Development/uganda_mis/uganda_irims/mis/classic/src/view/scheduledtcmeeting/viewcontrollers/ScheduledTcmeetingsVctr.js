Ext.define('Admin.view.scheduledtcmeeting.viewcontrollers.ScheduledTcmeetingsVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.scheduledtcmeetingsvctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },
	
	
    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },

    
    setConfigGridsStore: function (obj, options) {

        this.fireEvent('setConfigGridsStore', obj, options);
    },editpreviewProductInformation: function (item) {
        this.fireEvent('editpreviewProductInformation', item);
    },
    funcViewMeetingDetails:function(item){
            var me = this,
                btn = item.up('button'),
                record = btn.getWidgetRecord(),
                meeting_id = record.get('id'),
                module_id = record.get('module_id'),
                childXtype = item.childXtype,
                childXtype = Ext.widget(childXtype),
                meetingDetailsFrm = childXtype.down('form'),
                viewscheduledtcmeetingapplications = childXtype.down('panel[name=viewscheduledtcmeetingapplications]'),
                winTitle = item.winTitle,
                winWidth = item.winWidth;
                childXtype.setHeight(600);
                viewscheduledtcmeetingapplications.removeAll();

                if(module_id == 1){

                        var tc_meetingpnlgrid = 'productstcmeetinggrid';

                }else if(module_id == 2){

                    var tc_meetingpnlgrid = 'premisesmeetinggrid';
                }else if(module_id == 3){

                    var tc_meetingpnlgrid = 'gmpmeetinggrid';
                }else if(module_id == 5){

                    var tc_meetingpnlgrid = '';
                }else if(module_id == 7){

                    var tc_meetingpnlgrid = 'clinicaltrialmeetinggrid';
                }
                Ext.getBody().mask('Loading meeting details.........');
                childXtype.down('hiddenfield[name=meeting_id]').setValue(meeting_id)
                //meeting details 
                Ext.Ajax.request({
                    method: 'GET',
                    url: 'productregistration/prepareProductsRegMeetingStage',
                    params: {
                        meeting_id: meeting_id,
                        module_id: module_id
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message,
                            success = resp.success,
                            results = resp.results;
                        if (success == true || success === true) {
                            if (results) {
                                var model = Ext.create('Ext.data.Model', results);
                                meetingDetailsFrm.getViewModel().set('isReadOnly', true);
                                meetingDetailsFrm.loadRecord(model);
                            }
                            viewscheduledtcmeetingapplications.add({xtype:tc_meetingpnlgrid});                            
                            funcShowCustomizableWindow(winTitle, winWidth, childXtype, 'customizablewindow');
                            //applicationsStore.load();
                           // participantsStore.load();
                        } else {
                            toastr.error(message, 'Failure Response');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message,
                            success = resp.success;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
             
            
    }
});