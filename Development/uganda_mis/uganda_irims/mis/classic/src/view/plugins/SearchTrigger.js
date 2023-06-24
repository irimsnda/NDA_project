Ext.define('Admin.view.plugins.SearchTrigger', {
            extend: 'Ext.form.field.Text',
            alias: 'widget.searchtrigger',

            requires: [
                 'Ext.form.trigger.Trigger'
            ],

            defaultListenerScope: true,

            triggers: {
                search: {
                    handler: function (field, trigger, e) {
                        this.setFilter(this.up().dataIndex, this.getValue());
                    },
                    cls: 'x-form-search-trigger'
                },
                clear: {
                    handler: function (field, trigger, e) {
                        this.setValue('');
                        if (!this.autoSearch) this.setFilter(this.up().dataIndex, '');
                    },
                    cls: 'x-form-clear-trigger'
                }
            },
            listeners: {
                render: 'onTextfieldRender',
                change: 'onTextfieldChange'
            },

            onTextfieldRender: function (component, eOpts) {
                var me = this;
                me.ownerCt.on('resize', function () {
                    me.setWidth(this.getEl().getWidth());
                });
            },

            onTextfieldChange: function (field, newValue, oldValue, eOpts) {
                if (this.autoSearch) this.setFilter(this.up().dataIndex, this.getValue());
            },

            setFilter: function (filterId, value) {
                var store = this.up('grid').getStore();
                if (value) {
                    store.removeFilter(filterId, false);
                    var filter = {
                        id: filterId,
                        property: filterId,
                        value: value
                    };
                    if (this.anyMatch) filter.anyMatch = this.anyMatch;
                    if (this.caseSensitive) filter.caseSensitive = this.caseSensitive;
                    if (this.exactMatch) filter.exactMatch = this.exactMatch;
                    if (this.operator) filter.operator = this.operator;
                    console.log(this.anyMatch, filter);
                    store.addFilter(filter);
                } else {
                    store.filters.removeAtKey(filterId);
                    store.reload();
                }
            }

        });