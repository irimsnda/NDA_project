/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.common_forms.ManufacturingDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'manufacturingDetailsFrm',
    itemId: 'manufacturingDetailsFrm',
    layout: {
        type: 'column',
        columns: 2
    },
    bodyPadding: 5,
    controller: 'productregistrationvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.5,
        allowBlank: false,
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id'
    }, {
        xtype: 'hiddenfield',
        name: 'model',
        value: 'tra_manufacturers_information'
    }, {
        xtype: 'textfield',
        name: 'name',
        allowBlank: false,
        fieldLabel: 'Name'
    }, {
        xtype: 'textfield',
        name: 'contact_person',
        allowBlank: false,
        fieldLabel: 'Contact Person'
    }, {
        xtype: 'combo',
        fieldLabel: 'Country',
        name: 'country_id',
        store: 'countriesstr',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            change: function (cmbo, newVal) {
                var form = cmbo.up('form'),
                    regionStore = form.down('combo[name=region_id]').getStore(),
                    filterObj = {country_id: newVal},
                    filterStr = JSON.stringify(filterObj);
                regionStore.removeAll();
                regionStore.load({params: {filter: filterStr}});
            }
        }
    },
        {
            xtype: 'combo',
            fieldLabel: 'Region',
            name: 'region_id',
            store: 'regionsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        districtStore = form.down('combo[name=district_id]').getStore(),
                        filterObj = {region_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                    districtStore.removeAll();
                    districtStore.load({params: {filter: filterStr}});
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'District',
            name: 'district_id',
            store: 'districtsstr',
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Telephone',
            name: 'telephone_no'
        },

        {
            xtype: 'textfield',
            fieldLabel: 'Email Address',
            name: 'email_address'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Physical Address',
            name: 'physical_address'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Postal Address',
            name: 'postal_address',
            allowBlank: true
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Website',
            name: 'website',
            allowBlank: true
        }],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: ['->', {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            table_name: 'tra_manufacturers_information',
            storeID: 'manufacturingDetailsStr',
            formBind: true,
            ui: 'soft-purple',
            action_url: 'productregistration/saveManufacturerDetails',
            action: 'btn_savedetails'
        }
        ]
    }]
});