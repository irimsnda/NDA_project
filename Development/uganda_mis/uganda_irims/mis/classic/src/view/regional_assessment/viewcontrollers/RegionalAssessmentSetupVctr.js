Ext.define('Admin.view.regional_assessment.viewcontrollers.RegionalAssessmentSetupVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.regionalassessmentsetupvctr',

    /**
     * Called when the view is created
     */
    init: function() {

    },

    setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },

    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
     syncProceduretoCountry:function(btn) {
        var grid = btn.up('grid'),
            store = grid.getStore(),
            pnl = grid.up('panel'),
            category = pnl.down('hiddenfield[name=category]').getValue(),
            sm =grid.getSelectionModel(),
            assessment_procedure_id = grid.down('hiddenfield[name=assessment_procedure_id]').getValue(),
            selected = [];

        if (sm.hasSelection()) {
           var row = sm.getSelection();

           Ext.each(row, function(ob){
                 selected.push(ob.get('country_id'));
            });


             Ext.Ajax.request({
                    url: 'configurations/mapProcedureToCountry',
                    method: 'POST',
                    params: {
                        selected: JSON.stringify(selected),
                        category:category,
                        assessment_procedure_id: assessment_procedure_id
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success || success == true || success === true) {
                            sm.deselectAll();
                            toastr.success(message, 'Success Response!!');
                            store.load();
                        } else {
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        toastr.warning(message, 'Failure Response!!');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });

        }else{
            toastr.warning('Please select atleast one user', 'No selection');
        }
    
        
    },
});