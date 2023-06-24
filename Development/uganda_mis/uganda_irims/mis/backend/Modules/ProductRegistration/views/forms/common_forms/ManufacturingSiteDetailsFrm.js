/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.common_forms.ManufacturingSiteDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'manufacturingSiteDetailsFrm',
    itemId: 'manufacturingSiteDetailsFrm',
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
        value: 'par_man_sites'
    }, {
        xtype: 'textfield',
        name: 'name',
        allowBlank: false,
        fieldLabel: 'Name'
    },  {
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
            fieldLabel: 'Postal Address12',
            name: 'postal_address',
            allowBlank: true
        },{
            name:'manufacturer_id',
            xtype:'hiddenfield'
        }],
    dockedItems: [{
        xtype: 'toolbar',
        ui: 'footer',
        dock: 'bottom',
        items: ['->', {
            text: 'Save Details',
            iconCls: 'x-fa fa-save',
            table_name: 'par_man_sites',
            storeID: 'manufacturingSiteDetailsStr',
            formBind: true,
            is_manufacturingsite:1,
            ui: 'soft-purple',
            action_url: 'productregistration/saveManufacturerDetails',
            action: 'btn_savedetails'
        }
        ]
    }]
});