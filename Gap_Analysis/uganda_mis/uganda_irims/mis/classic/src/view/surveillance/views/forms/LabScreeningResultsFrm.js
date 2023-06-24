/**
 * Created by Kip on 3/15/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.LabScreeningResultsFrm', {
    extend: 'Admin.view.surveillance.views.forms.LabResultsAbstractFrm',
    xtype: 'labscreeningresultsfrm',
    frame: true,
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            handler: 'doCreateSurveillanceParamWin',
            action_url: 'surveillance/saveSurveillanceCommonData',
            table_name: 'tra_survsample_analysis_results',
            storeID: 'labscreeningresultsstr'
        }
    ],
    initComponent: function () {
        this.callParent();
        this.add(
            {
                xtype: 'hiddenfield',
                name: 'table_name',
                value: 'tra_survsample_analysis_results'
            },
            {
                xtype: 'hiddenfield',
                name: 'analysis_type_id',
                value: 2
            }
        );
    }
});