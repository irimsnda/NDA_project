/**
 * Created by Kip on 3/16/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.LabAnalysisResultsFrm', {
    extend: 'Admin.view.surveillance.views.forms.LabResultsAbstractFrm',
    xtype: 'labanalysisresultsfrm',
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
            storeID: 'labanalysisresultsstr'
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
                value: 3
            }
        );
    }
});