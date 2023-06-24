/**
 * Created by Softclans on 3/8/2019.
 */
Ext.define('Admin.view.commoninterfaces.forms.PremiseDetailsCmnFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premisedetailscmnfrm',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.25,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false
        
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: 'premise_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'manufacturing_site_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'main_registered_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'temporal_premise_id'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'name',
                    columnWidth: 0.9,
                    allowBlank: false,
                    fieldLabel: 'Name',
                    bind: {
                        readOnly: '{isReadOnly}'
                    }
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                    disabled: true,
                    columnWidth: 0.1,
                    tooltip: 'Search',
                    action: 'search_premise',
                    childXtype: 'premiseselectiongrid',
                    winTitle: 'Premises Selection List',
                    winWidth: '90%',
                    margin: '30 0 0 0',
                    bind: {
                        disabled: '{isReadOnly}'
                    }
                }
            ]
        },
        {
            xtype: 'textfield',
            name: 'premise_reg_no',
            fieldLabel: 'Registration No',
            hidden: true,
            bind: {
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'textfield',
            name: 'permit_no',
            fieldLabel: 'Permit No',
            hidden: true,
            readOnly: true
        },
        {
            xtype: 'textfield',
            name: 'gmp_cert_no',
            fieldLabel: 'GMP Certificate No',
            hidden: true,
            readOnly: true
        },
        {
            xtype: 'combo',
            fieldLabel: 'Country',
            name: 'country_id',
            store: 'countriesstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                beforerender: function () {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                },
                change: function (cmbo, newVal) {
                    var form = cmbo.up('form'),
                        regionStore = form.down('combo[name=region_id]').getStore(),
                        filterObj = {country_id: newVal},
                        filterStr = JSON.stringify(filterObj);
                    regionStore.removeAll();
                    regionStore.load({params: {filter: filterStr}});
                }
            },
            bind: {
                readOnly: '{isReadOnly}'
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
            },
            bind: {
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'District',
            name: 'district_id',
            store: 'districtsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            
            bind: {
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Street',
            name: 'street',
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Telephone',
            name: 'telephone',
            bind: {
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Fax',
            name: 'fax',
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email Address',
            name: 'email',
            bind: {
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Website',
            name: 'website',
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Physical Address',
            name: 'physical_address',
            bind: {
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Postal Address',
            name: 'postal_address',
            bind: {
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Business Scale',
            name: 'business_scale_id',
            store: 'businessscalesstr',
            valueField: 'id',
            displayField: 'name',
            allowBlank: true,
            queryMode: 'local',
            forceSelection: true,
            listeners:{
                afterrender: function(){
                    var store=this.getStore();
                    store.removeAll();
                    store.load();
                }
            },
            bind: {
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Longitude',
            name: 'longitude',
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Latitude',
            name: 'latitude',
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'
            }
        }
    ]
});