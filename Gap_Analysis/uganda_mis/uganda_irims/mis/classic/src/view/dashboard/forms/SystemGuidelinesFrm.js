/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.dashboard.forms.SystemGuidelinesFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.systemguidelinesfrm',
    frame: true,
    controller: 'dashboardvctr',
    requires: [
        'Ext.layout.*',
        'Ext.form.*'
    ],
    layout: {
        type: 'form'
    },
    defaults: {
        labelStyle: {
            'font-weight': 'bold'
        },
        labelCls: '',
        allowBlank: false,
        margin: 5
    },
    fieldDefaults: {
        xtype: 'textfield',
        cls: ''
    },
    items: [{
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        name: 'id'
    },{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'par_system_guidelines'
    },{
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    },{
        xtype: 'hiddenfield',
        fieldLabel: 'menu_id',
        name: 'menu_id'
    },{
        xtype: 'textfield',
        fieldLabel: 'Guideline',
        name: 'guideline'

    }, {
        xtype: 'textarea',
        fieldLabel: 'Description',
        name: 'description',
        allowBlank: true
    }, {
        xtype: 'numberfield',
        fieldLabel: 'Order No',
        name: 'order_no',
        allowBlank: true
    }],
    buttons: [{
        text: 'Save Details',
        formBind: true,
        action: 'save_guideline',
        //handler:'doCreateDashParamWin',
        table_name: 'par_system_guidelines',
        action_url:'dashboard/saveDashCommonData'
    }]
});