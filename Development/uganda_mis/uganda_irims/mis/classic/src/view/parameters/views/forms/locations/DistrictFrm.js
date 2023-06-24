Ext.define('Admin.view.parameters.views.forms.locations.DistrictFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.districtfrm',
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
        allowBlank: false,
        columnWidth: 1,
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
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        items:[{
                xtype: 'combobox',
                forceSelection: true,
                fieldLabel: 'Country',
                store: {
                    type: 'countriesstr',
                    pageSize: 0,
                    autoLoad:true,
                },
                displayField: 'name',
                valueField: 'id',
                allowBlank: false,
                margin: '0 20 20 0',
                name: 'country',
                listeners: {
                    select: function (cmbx, rec, eOpts) {
                        var form = cmbx.up('form'),
                            regionField = form.down("textfield[name=region]"),
                            store = regionField.getStore();
                        store.clearFilter();
                        store.getFilters().add(function (item) {
                            return item.getData().country_id == rec.id;
                        });
                        store.load();
                    }
                },
                columnWidth: 0.9
            },
            {
                xtype: 'button',
                text: 'add',
                width: '50px',
                iconCls: 'x-fa fa-plus',
                columnWidth: 0.082,
                form: 'countryfrm',
                title: 'Add Country',
                handler: 'showAddFormWin'
            }
        ]
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        items:[{
            xtype: 'combobox',
            forceSelection: true,
            fieldLabel: 'Region',
            store: {
                type: 'regionsstr',
                pageSize: 0,
                autoLoad: true
            },
            displayField: 'name',
            valueField: 'id',
            allowBlank: false,
            margin: '0 20 20 0',
            name: 'region',
            columnWidth: 0.9
        }, {
            xtype: 'button',
            text: 'add',
            width: '50px',
            iconCls: 'x-fa fa-plus',
            columnWidth: 0.082,
            form: 'regionfrm',
            title: 'Add Region',
            handler: 'showAddFormWin'
        }]
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
    action_url: 'parameters/district',
    store: 'districtsstr',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'districtsgrid',
        form: 'districtfrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {
        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'save',
        grid: 'districtsgrid',
        form: 'districtfrm',
        formBind: true,
        handler: 'doSaveParameter',
        store: 'districtsstr',
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