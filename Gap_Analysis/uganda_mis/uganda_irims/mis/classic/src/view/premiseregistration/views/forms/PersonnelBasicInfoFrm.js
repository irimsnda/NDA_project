/**
 * Created by Kip on 11/9/2018.
 */
Ext.define('Admin.view.premiseregistration.views.forms.PersonnelBasicInfoFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'personnelbasicinfofrm',
    scrollable:'true',
    controller: 'premiseregistrationvctr',
    layout: {
        type: 'column'
    },
    bodyPadding: 5,
    defaults: {
        margin: 4,
        allowBlank: false,
        columnWidth: 0.5,
        labelAlign: 'top'
    },
    listeners: {
        afterrender: function () {
            var form = this,
                isReadOnly = form.down('hiddenfield[name=isReadOnly]').getValue();
            if ((isReadOnly) && (isReadOnly == 1 || isReadOnly === 1)) {
                form.getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
                form.query('.button').forEach(function (c) {
                    c.setHidden(true);
                });
            }
        }
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'id'
        },
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        },
        {
            xtype: 'hiddenfield',
            name: '_token',
            value: token
        },
        {
            xtype: 'hiddenfield',
            name: 'table_name',
            value: 'tra_personnel_information'
        },
        {
            xtype: 'hiddenfield',
            name: 'trader_id'
        },
         {
            xtype: 'textfield',
            name: 'name', 
             fieldLabel: 'Name',
        },
        
        {
            xtype: 'textfield',
            name: 'email_address',
            fieldLabel: 'Email Address'
        },
         {
            xtype: 'textfield',
            name: 'telephone_no', 
             fieldLabel: 'Telephone No',
        }, {
                    xtype: 'textfield',
                    name: 'registration_no',
                    allowBlank:true,
                    fieldLabel: 'Registration No'
                },

                 {
                    xtype: 'datefield',
                    name: 'registration_date',
                    fieldLabel: 'Registration Date',
                    submitFormat: 'Y-m-d',
                    allowBlank:true,
                    format: 'd/m/Y',
                    altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00'
                   },

         
                {
                    xtype: 'combo',
                    name: 'qualification_id',
                    fieldLabel: 'Qualification',
                    forceSelection: true,
                    queryMode: 'local',
                    allowBlank: true,
                    valueField: 'id',
                    displayField: 'name',
                    listeners: {
                     beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'commonparam/getCommonParamFromTable',
                                extraParams: {
                                    table_name: 'par_personnel_qualifications'
                                }
                            }
                        },
                        isLoad: true
                    }
                }
               },{
                xtype: 'combo',
                fieldLabel: 'Country',
                name: 'country_id',
                //store: 'countriesstr',
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/country'
                            }
                        },
                        isLoad: true
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
                //store: 'regionsstr',
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/region'
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
                allowBlank:true,
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                displayField: 'name',
                listeners: {
                    beforerender: {
                        fn: 'setParamCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'parameters/district'
                            }
                        },
                        isLoad: false
                    }
                  
                }
              }
    ],
    buttons: [
        {
            xtype: 'button',
            text: 'Save Details',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-save',
            formBind: true,
            table_name: 'tra_personnel_information',
            storeID: 'traderpersonnelstr',
            action_url: 'premiseregistration/savePremisePersonnelDetails',
            handler: 'savePremisePersonnelBasicInfo',
            name: 'save_btn'
        },
        {
            xtype: 'button',
            text: 'Reset',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-close',
            name: 'reset_btn',
            handler: function () {
                this.up('form').getForm().reset();
            }
        }
    ]
});