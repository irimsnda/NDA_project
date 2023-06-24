/**
 * Created by Softclans on 10/5/2018.
 */
Ext.define('Admin.view.commoninterfaces.forms.ApplicationRejectionDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'applicationrejectiondetailsfrm',
    controller: 'commoninterfacesVctr',
    frame: true,
    scrollable: true,
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        margin: 3,
        allowBlank: false,
        columnWidth: 1,
        labelAlign: 'top'
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
       {
            xtype: 'hiddenfield',
            name: 'application_code'
        },{ 
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },{
            xtype: 'textarea',
            fieldLabel: 'Reason for Rejection',
            name: 'reason_of_rejection'
        },{
            xtype: 'textfield',
            fieldLabel: 'Reference Section(Optional)', 
            name: 'reference_section',
            allowBlank: true
        }
    ],
    buttons:[ {
        xtype: 'button',
        text: 'Save Reason for Rejection',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-save',
        formBind: true,
        reload_base:1,
        action: 'save_query',
        action_url: 'api/saveApplicationRejectionDetails',
        handler: 'saveApplicationRejectionDetails'
    }]
});