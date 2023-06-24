Ext.define('Admin.view.parameters.views.forms.locations.ParametereAddFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.parametereAddFrm',
    frame: false,
    bodyPadding: 10,
    controller: 'onlineservicesconfVctr',
    require : [
        'Ext.form.field.VTypes'
    ],
    layout: {
        type: 'form'
    },
    defaults: {
        labelAlign: 'top',
        labelStyle: {
            'font-weight': 'bold'
        },
        labelCls: '',
        allowBlank: false
    },
    fieldDefaults: {
        xtype: 'textfield',
        cls: ''
    },
    items: [{
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id'
    }, {
        xtype: 'textfield',
        value: token,
        name: '_token',
        hidden: true
    }, {
        xtype: 'textfield',
        fieldLabel: 'Name',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'name'
    }, {
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    }],
    
    buttons: [ {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        grid: 'countriesgrid',
        form: 'countryFrm',
        formBind: true,
		name: 'btnDataWin',
        handler: 'funcSaveformData',
        storeID: 'onlineappActionStr',
        ui: 'soft-purple',
		action_url: 'onlineservices/saveOnlinePortalData',
		table_name: '',
		
    }, {
        text: 'Reset',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-close',
        width: 15,
        height: 35,
        padding: '5 5 5 5',
        handler: function (btn) {
            btn.up('form').getForm().reset();
        }
    }]
});