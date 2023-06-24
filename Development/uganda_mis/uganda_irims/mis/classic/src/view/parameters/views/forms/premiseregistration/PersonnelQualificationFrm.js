Ext.define('Admin.view.parameters.views.forms.premiseregistration.PersonnelQualificationFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.personnelqualificationfrm',
    frame: false,
    bodyPadding: 10,
    controller: 'parametervctr',
    require : [
        'Ext.form.field.*'
    ],
    layout: {
        type: 'column'
    },
    defaults: {
        labelAlign: 'top',
        labelStyle: {
            'font-weight': 'bold'
        },
        labelCls: '',
        columnWidth: 1,
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
        xtype: 'fieldcontainer',
        layout: 'column',
        items:[{
            xtype: 'textfield',
            value: token,
            name: '_token',
            hidden: true
        }]
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        items:[{
            xtype: 'textfield',
            fieldLabel: 'Name',
            allowBlank: false,
            margin: '0 20 20 0',
            name: 'name',
            columnWidth: 1
        }]
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        items:[
            {
                xtype: 'combobox',
                forceSelection: true,
                fieldLabel: 'Study Field',
                flex: 1,
                store: {
                    type: 'studyfieldsstr',
                    pageSize: 0,
                    autoLoad:true
                },
                displayField: 'name',
                valueField: 'id',
                allowBlank: false,
                margin: '0 20 20 0',
                itemId: 'studyfieldId',
                name: 'studyfield',
                columnWidth: 0.9
            },
            {
                xtype: 'button',
                text: 'add',
                width: '50px',
                iconCls: 'x-fa fa-plus',
                columnWidth: 0.082,
                form: 'studyfieldfrm',
                title: 'Add Study Field',
                handler: 'showAddFormWin'
            }
        ]
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        items:[{
            xtype: 'textarea',
            fieldLabel: 'Description',
            margin: '0 20 20 0',
            name: 'description',
            allowBlank: true,
            columnWidth: 1
        }]
    }],
    action_url: 'premiseregistration/parameters/personnelqualification',
    store: 'personnelqualificationsstr',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'personnelqualificationsgrid',
        form: 'personnelqualificationfrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'save',
        grid: 'personnelqualificationsgrid',
        form: 'personnelqualificationfrm',
        formBind: true,
        handler: 'doSaveParameter',
        store: 'personnelqualificationsstr',
        ui: 'soft-purple'
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