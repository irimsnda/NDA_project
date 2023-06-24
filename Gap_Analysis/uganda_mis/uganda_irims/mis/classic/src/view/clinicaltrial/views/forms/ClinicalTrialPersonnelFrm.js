/**
 * Created by Kip on 1/19/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.forms.ClinicalTrialPersonnelFrm', {
    extend: 'Admin.view.clinicaltrial.views.forms.ClinicalTrialAbstractFrm',
    xtype: 'clinicaltrialpersonnelfrm',
    frame: true,
    controller: 'clinicaltrialvctr',
    defaults: {
        columnWidth: 0.5,
        margin: 5,
        labelAlign: 'top'
    },
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            handler: 'doCreateClinicalTrialParamWin',
            formBind: true,
            action_url: 'clinicaltrial/saveClinicalTrialCommonData',
            table_name: 'clinical_trial_personnel',
            storeID: 'clinicaltrialpersonnelstr'
        }],
    initComponent: function () {
        this.callParent();
        this.add(
            {
                xtype: 'hiddenfield',
                name: 'table_name',
                value: 'clinical_trial_personnel'
            }
        )
    }

});