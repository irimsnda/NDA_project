/**
 * Created by Kip on 3/8/2019.
 */
Ext.define('Admin.view.surveillance.views.forms.SampleCollectionSiteFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'samplecollectionsitefrm',
    layout: {
        type: 'column'
    },
    defaults: {
        columnWidth: 0.25,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false,
        bind: {
            disabled: '{isReadOnly}'
        }
    },
    itemId: 'samplecollectionsitefrmId',
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
                    fieldLabel: 'Name'
                },
                {
                    xtype: 'button',
                    iconCls: 'x-fa fa-search',
                   // disabled: true,
                    columnWidth: 0.1,
                    tooltip: 'Search',
                    action: 'search_premise',
                    childXtype: 'pmscollectionsiteselectiongrid',
                    winTitle: 'Premises Selection List',
                    winWidth: '90%',
                    margin: '30 0 0 0'
                }
            ]
        },
        {
            xtype: 'textfield',
            name: 'premise_reg_no',
            fieldLabel: 'Registration No',
            hidden: true,
            disabled: true
        },
        {
            xtype: 'textfield',
            name: 'permit_no',
            fieldLabel: 'Permit No',
            hidden: true,
            disabled: true
        },
        {
            xtype: 'textfield',
            name: 'gmp_cert_no',
            fieldLabel: 'GMP Certificate No',
            hidden: true,
            disabled: true
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
            readOnly:true,
            listeners: {
                beforerender: function (cbo) {
                    var store = this.store;
                    store.removeAll();
                    store.load();
                    cbo.setValue(126)
                },
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
           // store: 'regionsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                 beforerender: {
                        fn: 'setSurveillanceCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_regions'
                                }
                            }
                        },
                        isLoad: false
                    },
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
            //store: 'districtsstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                    beforerender: {
                        fn: 'setSurveillanceCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_districts'
                                }
                            }
                        },
                        isLoad: false
                    }
                }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Street',
            name: 'street',
            allowBlank: true
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Telephone',
            name: 'telephone'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Fax',
            name: 'fax',
            hidden: true,
            allowBlank: true
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Email Address',
            allowBlank: true,
            name: 'email'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Website',
            name: 'website',  hidden: true,
            allowBlank: true
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Physical Address',
            name: 'physical_address'
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Postal Address',
            name: 'postal_address'
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
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Longitude',
            name: 'longitude',
            allowBlank: true
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Latitude',
            name: 'latitude',
            allowBlank: true
        },{
            xtype:'hiddenfield',
            name:'sample_site_id'
        }
    ]
});